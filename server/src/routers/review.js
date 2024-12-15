const express = require("express");
const Review = require("../models/review");
const Recipe = require("../models/recipe");
const httpStatus = require("../util/httpStatus");
const { storage } = require("../util/storage");
const router = new express.Router();

router.post("/reviews", async (req, res) => {
  const review = new Review({
    ...req.body,
  });

  try {
    const recipe = await Recipe.findById(review.recipe);
    recipe.reviews.push(review._id);

    await recipe.save();
    await review.save();

    res.status(httpStatus.created).send(review);
  } catch (error) {
    res.status(httpStatus.badRequest).send({ error: error.message });
  }
});

//GET /recipes?completed=true
//GET /recipes?limit=10&skip=10
//GET /recipes?sortBy=createdAt_desc
router.get("/reviews/:recipeId", async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1] == "desc" ? -1 : 1; //set the field name on the sort object and assign -1 or 1 for the order value
  }

  try {
    const recipeId = req.params.recipeId;
    // const client = new sdk.Client()
    //   .setEndpoint(process.env.STORAGE_BASE_URL)
    //   .setProject(process.env.STORAGE_PROJECT_ID)
    //   .setKey(process.env.STORAGE_API_KEY);
    // console.log("AAAAAAAA ", client);
    console.log(storage);
    // const result = await fetchBuckets();
    const result = await storage.getFile(
      "675e4a780032d669c118", // bucketId
      "675e52b40037b42b4afa" // fileId
    );
    // https://cloud.appwrite.io/v1/storage/buckets/675e4a780032d669c118/files/675e52b40037b42b4afa/view?project=675e4a5d001f2d8923fb&project=675e4a5d001f2d8923fb&mode=admin
    // const storage = new sdk.Storage(client);
    // const result = await storage.listBuckets();
    console.log("List of buckets: ", result);
    // fileUrl: https://cloud.appwrite.io/v1/storage/buckets/675e4a780032d669c118/files/675e52b40037b42b4afa/view?project=675e4a5d001f2d8923fb

    const reviews = await Review.find({ recipe: recipeId }, null, {
      limit: parseInt(req.query.limit), //if not provided it will or if its not an int its gonna be ignored by mongoose
      skip: parseInt(req.query.skip),
      sort,
    }).populate("user");

    res.status(httpStatus.ok).send(reviews);
  } catch (error) {
    console.log(error);
    res.sendStatus(httpStatus.internalServerError).send(error);
  }
});

// router.get('/reviews/:id', async (req, res) => {
//     try {
//         const reviewId = req.params.id;
//         const review = await Review.findOne({ _id: reviewId });
//         if (!review) {
//             res.status(httpStatus.notFound).send();
//         }
//         res.status(httpStatus.ok).send(review);
//     } catch (error) {
//         res.status(httpStatus.internalServerError).send(error.message);
//     };
// });

// router.delete('/reviews/:id', async (req, res) => {
//     try {
//         const review = await Review.findOneAndDelete({ _id: req.params.id });
//         if (!review) {
//             return res.status(httpStatus.notFound).send();
//         }
//         res.send(review);
//     } catch (error) {
//         res.status(httpStatus.internalServerError).send(error.message);
//     }
// });

module.exports = router;
