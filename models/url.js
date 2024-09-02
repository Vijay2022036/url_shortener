const mongoose = require("mongoose");
const user = require("./user");
const urlSchema = new mongoose.Schema({
    shortUrl : {
        type : String,
        unique : true,
    },
    redirectUrl : {
        type : String,
        required : true,
    },
    visitHistory : [{timestamp : {type : Number}}],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
} , 
{timestamps : true})
const url = mongoose.model("url" , urlSchema);

module.exports = url;