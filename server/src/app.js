const express = require('express');
require('./db/mongoose');
const allowClientRequests = require('./middleware/allowClientRequests');
const recipeRouter = require('./routers/recipe');
const userRouter = require('./routers/user');
const reviewRouter = require('./routers/review');
const ingredientRouter = require('./routers/ingredient');
const materialRouter = require('./routers/material');
const categoryRouter = require('./routers/category');
const dietTypeRouter = require('./routers/dietType');
const favoriteRouter = require('./routers/favorite');

const app = express();

app.use(express.json());
app.use(allowClientRequests);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.use(recipeRouter);
app.use(userRouter);
app.use(reviewRouter);
app.use(ingredientRouter);
app.use(materialRouter);
app.use(categoryRouter);
app.use(dietTypeRouter);
app.use(favoriteRouter);

module.exports = app;
