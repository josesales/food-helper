const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancellationEmail } = require('../email/emailSender');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const router = new express.Router();

router.post('/users', jsonParser, async (req, res) => {
    const user = new User(req.body);

    try {

        const token = await user.generateAuthToken();
        // sendWelcomeEmail(user.email, user.name);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/users/login', async (req, res) => {

    try {

        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/users/logout', auth, async (req, res) => {

    try {

        //removes the token which the user logged in
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();

        res.send('Logged Out');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {

    try {

        //Remove all the tokens
        req.user.tokens = [];
        await req.user.save();

        res.send('Logged Out of all the App');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch('/users/me', auth, async (req, res) => {

    const requestFields = Object.keys(req.body);
    const userFields = ['name', 'email', 'password', 'age'];
    const isRequestValid = requestFields.every(requestField => userFields.includes(requestField))

    if (!isRequestValid) {
        res.status(400).send({ error: 'Request fields not valid' });
    }

    try {

        //set the new fields sent in the request
        requestFields.forEach(requestField => req.user[requestField] = req.body[requestField]);
        await req.user.save();

        res.send(req.user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {

        await req.user.remove();
        // sendCancellationEmail(req.user.email, req.user.name);

        res.send(req.user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const upload = multer({

    limits: {
        fileSize: 1000000 // max size of the file in bytes. 1000000 = 1mb
    },

    //set the type of file which can be uploaded, callback(error, boolean if upload should be accepted or ignored);
    fileFilter(req, file, callback) {

        if (file.originalname.match(/\.(jpg|jpeg|png)$/)) { //regular expression that checks if the extension is either jpg, jpeg or png
            callback(undefined, true); //allow file to be uploaded
        } else {
            return callback(new Error('File must be an image'));
        }
    }
})

//Avatar = User profile picture
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    // req.filter.buffer is accessible when we don't set the dest property on multer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();

    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined;
    await req.user.save();

    res.send();
});

router.get('/users/me/:id/avatar', async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user.avatar) {
            res.status(400).send({ error: 'Not Found' });
        }

        res.set('Content-Type', 'image/png'); //set response header 
        res.send(user.avatar);

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;