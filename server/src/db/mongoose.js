const mongoose = require('mongoose');

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config({ path: '../config/.env' });
}

const connectionUrl = process.env.DB_URI;

mongoose.connect(connectionUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});