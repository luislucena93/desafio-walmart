const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
//const dbConfig = require('../config/dbConfig');
const Product = require('../schemas/product');
const Discount = require('../schemas/discount');

/*mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(() => {
    console.log('successfully connected to the database');
}).catch(err => {
    console.log(err);
    console.log('error connecting to the database');
});*/

//const products = mongoose.model('products', productSchema);
//const discounts = mongoose.model('discounts', discountSchema);


router.get('/products', (req, res) => {
    Product.find().then(result => {
        res.json(result);
    })
});

router.post('/discounts', async (req, res) => { //{'marca1': 19000, 'marca2': 20000}
    const brandsTotals = req.body;
    const brandsNames = Object.keys(brandsTotals);
    const brandsDiscounts = await Discount.find({'brand': {$in: brandsNames}}).sort('discount');
    let maxDiscountReached = null;
    const maxDiscountPossible = brandsDiscounts[brandsDiscounts.length - 1] || null;
    brandsDiscounts.forEach((discount) => {
        if (discount.threshold <= brandsTotals[discount.brand]) {
            maxDiscountReached = discount;
        }
    });
    res.json({maxDiscountReached, maxDiscountPossible});
});


module.exports = router;
