const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const {restrictTo} = require("../middlewares/auth")

router.get("/", restrictTo(["NORMAL" , "ADMIN"]) , async (req, res) => {
    if(!req.user)return res.redirect("/login");
    const allUrl = await URL.find({createdBy : req.user._id});
    return res.render("home", {
        allurl: allUrl,
    });
});

router.get("/admin/urls", restrictTo(["ADMIN"]) , async (req, res) => {
    if(!req.user)return res.redirect("/login");
    const allUrl = await URL.find({});
    return res.render("home", {
        allurl: allUrl,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
