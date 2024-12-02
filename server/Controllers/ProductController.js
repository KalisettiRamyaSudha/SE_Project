const ProductsSchema = require("../Models/ProductsModel");
const ProductsModel = require("../Models/ProductsModel");
const mongoose = require("mongoose");


const ProductController = async (req, res) => {
  const { productId } = req.params;
  try {
    const data = await ProductsSchema.findById(productId);
    if (!data) {
      return res.status(200).json({ notFound: "Product not found" });
    }


    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(200).json({ inValid: "Invalid product ID" });
      }
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { ProductController };
