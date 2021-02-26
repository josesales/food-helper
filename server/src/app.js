const express = require('express');
require('./db/mongoose');
const allowClientRequests = require('./middleware/allowClientRequests');
const recipeRouter = require('./routers/recipe');

const app = express();

app.use(express.json());
app.use(allowClientRequests);

app.use(recipeRouter);

module.exports = app;
