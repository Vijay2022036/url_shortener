// const {v4: uuidv4} = require("uuid");
const User = require("../models/user.js");
const {setUser , getUser} = require("../services/auth.js");
async function handleSignup(req, res) {
    const { fullName, email, password } = req.body;
    try {
        await User.create({
            fullName,
            email,
            password,
        });
        return res.redirect('/');  // Redirects to the home page
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error signing up");
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email : email, password : password });
        if (!user) {
            return res.render('login' , {
                error: "Wrong email or password."
            });  // Render login view again if user not found
        }
        const token = setUser(user);
        res.cookie("token" , token);
        return res.redirect('/');  // Redirects to the home page
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error logging in");
    }
}

module.exports = {
    handleLogin,
    handleSignup,
};
