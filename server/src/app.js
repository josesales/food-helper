const express = require('express');
require('./db/mongoose');
const allowClientRequests = require('./middleware/allowClientRequests');
const recipeRouter = require('./routers/recipe');
const userRouter = require('./routers/user');
const reviewRouter = require('./routers/review');
const ingredientRouter = require('./routers/ingredient');
const materialRouter = require('./routers/material');

const app = express();

app.use(express.json());
app.use(allowClientRequests);

app.use(recipeRouter);
app.use(userRouter);
app.use(reviewRouter);
app.use(ingredientRouter);
app.use(materialRouter);

module.exports = app;
