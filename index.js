const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { connectToDb, disconnectFromDb } = require("./connection");
const userRouter = require("./router/user");

const app = express();
const PORT = process.env.PORT || 7001;

app.set("view-engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
    return res.render("Home.ejs")
})

app.use("/user", userRouter);

connectToDb().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to db and Server is running on port", PORT);
    })
}).catch((err) => {
    disconnectFromDb();
    console.log("db err", err);
    process.exit(1);
})