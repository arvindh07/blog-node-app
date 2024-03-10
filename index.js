const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const path = require("path");

const { connectToDb, disconnectFromDb } = require("./connection");
const userRouter = require("./router/user");
const blogRouter = require("./router/blog");
const { checkAndVerifyToken } = require("./middlewares/authentication");
const blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT || 7001;

app.set("view-engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkAndVerifyToken());


app.get("/", async (req, res) => {
    const allBlogs = await blog.find().sort({ createdAt: -1 });
    return res.render("Home.ejs", {allBlogs, user: req.user});
})
app.locals.getTimeAgo = (postedDate) => {
    const TimeAgo = require('javascript-time-ago')
    const en = require('javascript-time-ago/locale/en')
    TimeAgo.addDefaultLocale(en)
    const timeAgo = new TimeAgo('en-US')
    return timeAgo.format(postedDate)
}

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