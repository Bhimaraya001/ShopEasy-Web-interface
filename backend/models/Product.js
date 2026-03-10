const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({

 name: String,
 image: String,
 description: String,
 category: String,
 price: Number

});

module.exports = mongoose.model("Product", ProductSchema);