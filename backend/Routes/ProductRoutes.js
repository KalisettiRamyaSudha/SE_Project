const express = require("express");
const { ProductController } = require("../Controllers/ProductController");
const router = express.Router();


router.get("/product/:productId", ProductController);

module.exports = router