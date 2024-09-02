const shortid = require("shortid");
const URL = require("../models/url");
async function HandleAllURL(req, res) {
    try {
        const urls = await URL.find({});
        return res.json(urls);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch URLs." });
    }
}

async function HandleRedirects(req, res) {
    try {
        const shortUrl = req.params.shortUrl;
        const url = await URL.findOneAndUpdate(
            { shortUrl },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (!url) {
            return res.status(404).json({ error: "Short URL not found." });
        }

        return res.redirect(url.redirectUrl);
    } catch (err) {
        return res.status(500).json({ error: "Failed to handle redirect." });
    }
}

async function HandleNewURL(req, res) {
    const body = req.body;
    if (!body.redirectUrl) {
        return res.status(400).json({ error: "URL is required." });
    }
    try {
        const shortURL = shortid();
        console.log(req.user._id);
        await URL.create({
            shortUrl: shortURL,
            redirectUrl: body.redirectUrl,
            visitHistory: [],
            createdBy : req.user._id,
        });

        return res.redirect("/");
    } catch (err) {
        return res.status(500).json({ error: "Failed to create new URL." });
    }
}

module.exports = {
    HandleAllURL,
    HandleNewURL,
    HandleRedirects,
};
