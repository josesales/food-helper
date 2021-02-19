const express = require('express');
require('./db/mongoose');
const recipeRouter = require('./routers/recipe');

const app = express();

app.use(express.json());
app.use(recipeRouter);

module.exports = app;
