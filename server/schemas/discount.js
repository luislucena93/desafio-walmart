const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    brand: String,
    threshold: Number,
    discount: Number,
});

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;
