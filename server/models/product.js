const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: Number,
    brand: String,
    description: String,
    image: String,
    price: Number
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
