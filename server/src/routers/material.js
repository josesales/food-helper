const express = require('express');
const Material = require('../models/material');
const httpStatus = require('../util/httpStatus');

const router = new express.Router();

router.post('/materials', async (req, res) => {
    const material = new Material({
        ...req.body,
    });

    try {
        await material.save();
        res.status(httpStatus.created).send(material);
    } catch (error) {
        res.status(httpStatus.badRequest).send(error.message);
    }
});

router.get('/materials', async (req, res) => {

    try {
        const materials = await Material.find();

        res.status(httpStatus.ok).send(materials);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});

router.get('/material/:recipeId', async (req, res) => {

    try {
        const recipeId = req.params.recipeId;

        const materials = await Material.find({ recipe: recipeId });

        res.status(httpStatus.ok).send(materials);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});

module.exports = router;