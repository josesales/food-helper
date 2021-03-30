const multer = require('multer');

const imageUpload = multer({

    limits: {
        fileSize: 1000000 // max size of the file in bytes. 1000000 = 1mb
    },

    //set the type of file which can be uploaded, callback(error, boolean if upload should be accepted or ignored);
    fileFilter(req, file, callback) {

        if (file.originalname.match(/\.(jpg|jpeg|png)$/)) { //regular expression that checks if the extension is either jpg, jpeg or png
            callback(undefined, true); //allow file to be uploaded
        } else {
            return callback(new Error('File must be an image'));
        }
    }
});

module.exports = imageUpload;