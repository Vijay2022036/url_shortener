const express = require("express");
const router = express.Router();
const { handleLogin, handleSignup } = require("../controllers/user.js");

// POST route for user signup
router.post("/", handleSignup);

// POST route for user login
router.post("/login", handleLogin);

module.exports = router;
