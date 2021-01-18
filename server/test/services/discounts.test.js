const {getMaxDiscounts} = require('../../../server/services/discounts');
const DiscountModel = require('../../../server/models/discount');

describe('Products services', () => {
    const testDiscounts = [{
        brand: 'testBrand1',
        threshold: 10000,
        discount: 1000,
    }, {
        brand: 'testBrand2',
        threshold: 20000,
        discount: 2000,
    }, {
        brand: 'testBrand3',
        threshold: 30000,
        discount: 3000,
    }];

    beforeAll(() => {
        DiscountModel.find = jest.fn().mockImplementation((query) => {
            const filteredDiscounts = testDiscounts.filter((discount) => query.brand.$in.includes(discount.brand));
            return {sort: jest.fn().mockResolvedValue(filteredDiscounts)}
        });
    });

    it('should get maxDiscounts for no brands in totals ', async (done) => {
        const result = await getMaxDiscounts({});
        expect(result).toEqual({maxDiscountPossible: null, maxDiscountReached: null});
        done();
    });

    it('should get maxDiscounts when brand is in totals but no threshold is reached', async (done) => {
        const result = await getMaxDiscounts({testBrand1: 5000});
        expect(result).toEqual({maxDiscountPossible: testDiscounts[0], maxDiscountReached: null});
        done();
    });

    it('should get maxDiscounts when brand is in totals and threshold is reached', async (done) => {
        const result = await getMaxDiscounts({testBrand1: 20000});
        expect(result).toEqual({maxDiscountPossible: testDiscounts[0], maxDiscountReached: testDiscounts[0]});
        done();
    });


    it('should get maxDiscounts when several brands are in totals and threshold is not reached', async (done) => {
        const result = await getMaxDiscounts({testBrand1: 5000, testBrand2: 10000, testBrand3: 20000});
        expect(result).toEqual({maxDiscountPossible: testDiscounts[2], maxDiscountReached: null});
        done();
    });

    it('should get maxDiscounts when several brands are in totals and several threshold are reached', async (done) => {
        const result = await getMaxDiscounts({testBrand1: 20000, testBrand2: 30000, testBrand3: 40000});
        expect(result).toEqual({maxDiscountPossible: testDiscounts[2], maxDiscountReached: testDiscounts[2]});
        done();
    });
})