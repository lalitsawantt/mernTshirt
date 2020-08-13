const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var Schema = mongoose.Schema;

var testSchema = new Schema({
    name: String
}, {timestamps: true})


module.exports = mongoose.model("User", testSchema);