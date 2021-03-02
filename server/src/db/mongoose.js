const mongoose = require('mongoose');

const connectionUrl = process.env.DB_URI;

mongoose.connect(connectionUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});