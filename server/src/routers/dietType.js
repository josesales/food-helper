const express = require('express');
const DietType = require('../models/dietType');
const httpStatus = require('../util/httpStatus');

const router = new express.Router();

router.post('/dietTypes', async (req, res) => {

    const dietType = new DietType({
        ...req.body,
    });

    try {
        await dietType.save();
        res.status(httpStatus.created).send(dietType);
    } catch (error) {
        res.status(httpStatus.badRequest).send(error.message);
    }
});

router.get('/dietTypes', async (req, res) => {
    try {

        const dietTypes = await DietType.find();

        res.status(httpStatus.ok).send(dietTypes);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});

module.exports = router;