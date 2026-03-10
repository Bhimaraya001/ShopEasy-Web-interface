const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Product = require("./models/Product");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/shopeasy")
.then(()=>console.log("MongoDB Connected"));

/* ADD PRODUCT */

app.post("/add-product", async (req,res)=>{

 const product = new Product(req.body);

 await product.save();

 res.send("Product Added");

});

/* GET PRODUCTS */

app.get("/products", async (req,res)=>{

 const products = await Product.find();

 res.json(products);

});

/* DELETE PRODUCT */

app.delete("/delete-product/:id", async (req,res)=>{

 const id = req.params.id;

 await Product.findByIdAndDelete(id);

 res.send("Product Deleted");

});

app.listen(5000, ()=>{
 console.log("Server running on port 5000");
});