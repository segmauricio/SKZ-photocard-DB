const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    if (allowedFileTypes.includes(file.mimetype)) {
        console.log("Correct File");
        cb(null, true);
    } else {
        console.log("Incorrect File");
        cb(null, false);
        cb(new Error('File extension not supported'))
    }
}

module.exports.upload = multer({ storage: storage, fileFilter: fileFilter })