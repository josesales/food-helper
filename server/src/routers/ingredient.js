const express = require("express");
const Ingredient = require("../models/ingredient");
const httpStatus = require("../util/httpStatus");

const router = new express.Router();

router.post("/ingredients", async (req, res) => {
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

router.get("/ingredients", async (req, res) => {
  try {
    const ingredients = await Ingredient.find();

    res.status(httpStatus.ok).send(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

router.get("/ingredients/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    const ingredients = await Ingredient.find({ recipe: recipeId });

    res.status(httpStatus.ok).send(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

router.get("/fetchIngredientsByFilters", async (req, res) => {
  try {
    const { limit, ...filters } = req.query;

    if (filters.name) {
      // create a regular expression for the name that allows substring and case insensitive match
      filters.name = new RegExp(filters.name.split("").join(".*"), "i");
    }

    const maxLimit = limit ? parseInt(limit) : null;

    if (limit && (isNaN(maxLimit) || maxLimit <= 0)) {
      return res
        .sendStatus(httpStatus.badRequest)
        .send({ message: "Invalid limit value" });
    }

    let ingredients;
    if (maxLimit) {
      ingredients = await Ingredient.find(filters).limit(maxLimit);
    } else {
      ingredients = await Ingredient.find(filters);
    }
    res.status(httpStatus.ok).send(ingredients);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

module.exports = router;
