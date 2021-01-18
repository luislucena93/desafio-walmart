const ProductModel = require('../models/product');

const getProducts = async () => {
    const products = await ProductModel.find();
    return products;
};

module.exports = {getProducts};