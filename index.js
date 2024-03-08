const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");

const { connectToDb, disconnectFromDb } = require("./connection");
const userRouter = require("./router/user");
const blogRouter = require("./router/blog");
const { checkForAuth } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 7001;


app.set("view-engine", "ejs");
app.set(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuth());

const multer = require("multer");
const { verifyTokenAndCheckAuth } = require("./middlewares/token");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("calling destination ", req.file)
        cb(null, 'public/profilePics/')
    },
    filename: function (req, file, cb) {
        console.log("filename ", file);
        const fileName = Date.now() + '-' + file.originalname
        cb(null, fileName)
    }
})
const upload = multer({ storage })

app.get("/", (req, res) => {
    console.log("home req ", req.user);
    return res.render("Home.ejs")
})

app.use("/user", userRouter);
app.use("/blog", blogRouter);

connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to db and Server is running on port", PORT);
    })
}).catch((err) => {
    disconnectFromDb();
    console.log("db err", err);
    process.exit(1);
})