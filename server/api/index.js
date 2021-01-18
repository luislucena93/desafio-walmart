const express = require('express');
const router = express.Router();
const {getProducts} = require('../services/products');
const {getMaxDiscounts} = require('../services/discounts');

router.get('/products', async (req, res) => {
    const products = await getProducts();
    res.json(products);
});

router.post('/discounts', async (req, res) => {
    const brandsTotals = req.body; //{'marca1': 19000, 'marca2': 20000}
    const maxDiscounts = await getMaxDiscounts(brandsTotals);
    res.json(maxDiscounts);
});


module.exports = router;
