const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./connectDB");
const userRoute = require("./routes/user.js");
const urlRoute = require("./routes/url.js");
const staticRoute = require("./routes/static.js");
const PORT = 8001;
const path = require("path");
const {checkAuthentication , restrictTo } = require("./middlewares/auth.js");

// Connection
connectDb("mongodb://127.0.0.1:27017/link-shortener")
    .then(() => {
        console.log("MongoDB connected.");
    });

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkAuthentication);

// Routes
app.use("/url", restrictTo(["NORMAL" , "ADMIN"]) , urlRoute);
app.use("/user", userRoute);
app.use("/" , staticRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}.`);
});
