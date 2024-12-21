const express = require("express");
const Favorite = require("../models/favorite");
const Recipe = require("../models/recipe");
const httpStatus = require("../util/httpStatus");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/favorites", auth, async (req, res) => {
  try {
    const favorite = await Favorite.saveFavorite({
      user: req.user._id,
      recipe: req.body.recipe,
    });
    res.status(httpStatus.created).send(favorite);
  } catch (error) {
    console.log(error);
    res.status(httpStatus.badRequest).send({ error: error.message });
  }
});

router.delete("/favorites/:recipeId", auth, async (req, res) => {
  try {
    //check if it's working properly
    const recipe = await Favorite.removeFavorite({
      user: req.user._id,
      recipe: req.params.recipeId,
    });
    res.status(httpStatus.ok).send({ recipe });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.badRequest).send({ error: error.message });
  }
});

//GET /favorites?completed=true
//GET /favorites?limit=10&skip=10
//GET /favorites?sortBy=createdAt_desc
router.get("/favoriteRecipes", auth, async (req, res) => {
  const sort = {};
  let shouldGetTotal = false;

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1; //set the field name on the sort object and assign -1 or 1 for the order value
  }

  if (req.query.total && req.query.total === "true") {
    shouldGetTotal = true;
  }

  const userId = req.user._id;

  try {
    if (!userId) {
      throw new Error("User should be sent");
    }
    console.log("req.query: ", req.query);
    console.log("req.query: ", req.query);
    let favorite = await Favorite.findOne({ user: userId }, null).populate({
      path: "recipes",
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
      populate: [
        {
          path: "ingredients",
          model: "Ingredient",
        },
        {
          path: "user",
          model: "User",
        },
        {
          path: "reviews",
          model: "Review",
        },
      ],
    });

    let total = null;
    if (shouldGetTotal) {
      total = await Favorite.findOne({ user: userId });
      total = total.recipes.length;
    }

    const recipes = Recipe.getRecipesWithRate(favorite.recipes);
    res.send({ recipes, total });
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

router.get("/recipeByFavorite/:recipeId", auth, async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    console.log("recipeId: ", recipeId);
    console.log("recipeId: ", userId);
    let favorite = await Favorite.findOne({ user: userId }).populate("recipes");
    console.log("favorite: ", favorite);
    const recipes = favorite?.recipes?.filter(
      (recipe) => recipe._id == recipeId
    );
    const recipe = recipes?.length > 0 ? recipes[0] : null;
    if (recipe) {
      res.status(httpStatus.ok).send({ recipe });
    } else {
      res.sendStatus(httpStatus.notFound);
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.badRequest).send({ error: error.message });
  }
});

module.exports = router;
