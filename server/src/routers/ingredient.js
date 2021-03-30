const express = require('express');
const Ingredient = require('../models/ingredient');
const httpStatus = require('../util/httpStatus');

const router = new express.Router();

router.post('/ingredients', async (req, res) => {

    const ingredient = new Ingredient({
        ...req.body,
    });

    try {
        await ingredient.save();
        res.status(httpStatus.created).send(ingredient);
    } catch (error) {
        res.status(httpStatus.badRequest).send(error.message);
    }
});

router.get('/ingredients', async (req, res) => {

    try {

        const ingredients = await Ingredient.find();

        res.status(httpStatus.ok).send(ingredients);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});

router.get('/ingredients/:recipeId', async (req, res) => {

    try {
        const recipeId = req.params.recipeId;

        const ingredients = await Ingredient.find({ recipe: recipeId });

        res.status(httpStatus.ok).send(ingredients);
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});

module.exports = router;