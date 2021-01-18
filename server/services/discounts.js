const DiscountModel = require('../models/discount');

const getMaxDiscounts = async (brandsTotals) => {
    const brandsNames = Object.keys(brandsTotals);
    const brandsDiscounts = await DiscountModel.find({'brand': {$in: brandsNames}}).sort('discount');
    let maxDiscountReached = null;
    const maxDiscountPossible = brandsDiscounts[brandsDiscounts.length - 1] || null;
    brandsDiscounts.forEach((discount) => {
        if (discount.threshold <= brandsTotals[discount.brand]) {
            maxDiscountReached = discount;
        }
    });
    return ({maxDiscountReached, maxDiscountPossible});
};

module.exports = {getMaxDiscounts};