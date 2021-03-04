const moment = require('moment');

const toDateString = date => moment(date).format("MMM DD YYYY h:mm a");

module.exports = {
    toDateString,
}