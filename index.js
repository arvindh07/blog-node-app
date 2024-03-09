const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const path = require("path");

const { connectToDb, disconnectFromDb } = require("./connection");
const userRouter = require("./router/user");
const blogRouter = require("./router/blog");
const { checkForAuthToken } = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 7001;

app.set("view-engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthToken());

const multer = require("multer");
const blog = require("./models/blog");
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

app.get("/", async (req, res) => {
    const allBlogs = await blog.find().sort({ createdAt: -1 });
    return res.render("Home.ejs", {allBlogs, user: req.user});
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