const express = require('express');
const Category = require('../models/category');
const httpStatus = require('../util/httpStatus');

const router = new express.Router();

router.post('/categories', async (req, res) => {

    const category = new Category({
        ...req.body,
    });

    try {
        await category.save();
        res.status(httpStatus.created).send(category);
    } catch (error) {
        res.status(httpStatus.badRequest).send(error.message);
    }
});

router.get('/categories', async (req, res) => {

    try {
        const categories = await Category.find();

        res.status(httpStatus.ok).send(categories);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});

module.exports = router;