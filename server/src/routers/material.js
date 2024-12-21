const express = require("express");
const Material = require("../models/material");
const httpStatus = require("../util/httpStatus");

const router = new express.Router();

router.post("/materials", async (req, res) => {
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

router.get("/materials", async (req, res) => {
  try {
    const materials = await Material.find();

    res.status(httpStatus.ok).send(materials);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

router.get("/material/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    const materials = await Material.find({ recipe: recipeId });

    res.status(httpStatus.ok).send(materials);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

router.get("/fetchMaterialsByFilters", async (req, res) => {
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

    let materials;
    if (maxLimit) {
      materials = await Material.find(filters).limit(maxLimit);
    } else {
      materials = await Material.find(filters);
    }
    res.status(httpStatus.ok).send(materials);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

module.exports = router;
