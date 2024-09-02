const express = require("express");
const router = express.Router();
const {HandleAllURL , HandleNewURL ,HandleRedirects} = require("../controllers/url.js");
router.route("/")
.get(HandleAllURL)
.post(HandleNewURL);

router.route("/:shortUrl")
.get(HandleRedirects);

module.exports = router;