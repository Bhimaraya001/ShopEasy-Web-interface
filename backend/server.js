require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Razorpay = require("razorpay");

const Product = require("./models/Product");
const Order = require("./models/Order")
const app = express();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

/* SERVE UPLOADED IMAGES */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* DATABASE CONNECTION */

mongoose.connect("mongodb://127.0.0.1:27017/shopeasy")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* MULTER CONFIGURATION */

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }

});

const upload = multer({
  storage: storage
});

/* RAZORPAY CONFIGURATION */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

/* ADD PRODUCT */

app.post("/add-product", upload.single("image"), async (req, res) => {

  try {

    console.log("ORDER RECEIVED:", req.body);
    const product = new Product({

      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      image: req.file.filename

    });

    await product.save();

    res.json({
      message: "Order Saved Successfully",
      
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Error adding product" });

  }

});

/* GET PRODUCTS */

app.get("/products", async (req, res) => {

  try {

    const products = await Product.find().sort({createdAt:-1});

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: "Error fetching products" });

  }

});

/* DELETE PRODUCT */

app.delete("/delete-product/:id", async (req, res) => {

  try {

    const id = req.params.id;

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product Deleted" });

  } catch (error) {

    res.status(500).json({ message: "Delete failed" });

  }

});

/* CREATE RAZORPAY ORDER */

app.post("/create-order", async (req, res) => {

  try {

    const options = {

      amount: req.body.amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: "receipt_" + Date.now()

    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Razorpay order creation failed" });

  }

});

app.post("/save-order", async (req, res) => {

  try {

    const newOrder = new Order({
      items: req.body.items,
      total: req.body.total,
      paymentId: req.body.paymentId,
      orderId: req.body.orderId
    });

    await newOrder.save();

    res.json({ message: "Order saved successfully" });

  } catch (error) {

    res.status(500).json({ message: "Order save failed" });

  }

});

/* GET ORDERS */

app.get("/orders", async (req, res) => {

  try {

    const orders = await Order.find().sort({ _id: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: "Error fetching orders" });

  }

});

/* START SERVER */

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});