const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("calling destination ", req.file);
        cb(null, 'public/profilePics/')
    },
    filename: function (req, file, cb) {
        // console.log("filename ", file);
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName)
    }
})

const upload = multer({ storage })
module.exports = upload;