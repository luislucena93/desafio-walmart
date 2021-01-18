const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    brand: String,
    threshold: Number,
    discount: Number,
});

const DiscountModel = mongoose.model("Discount", discountSchema);

module.exports = DiscountModel;
