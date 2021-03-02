const mongoose = require('mongoose');

const dietTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
    }
);

const DietType = mongoose.model('DietType', dietTypeSchema);
module.exports = DietType;