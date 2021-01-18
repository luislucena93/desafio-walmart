const {getProducts} = require('../../../server/services/products');
const ProductModel = require('../../../server/models/product');

describe('Products services', () => {
    const testProducts = [{
        _id: 'testId',
        id: 'testId',
        brand: 'testBrand',
        description: 'testDescription',
        image: 'testImage',
        price: 1000
    }];

    beforeAll(() => {
        ProductModel.find = jest.fn().mockResolvedValue(testProducts);
    })

    it('should get all products', async (done) => {
        const result = await getProducts();
        expect(result).toEqual(testProducts);
        done();
    })
})