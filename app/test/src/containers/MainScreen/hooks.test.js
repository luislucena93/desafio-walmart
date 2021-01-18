import {renderHook} from "@testing-library/react-hooks";
import {useFetchProducts, useGetDiscounts} from '../../../../../app/src/containers/MainScreen/hooks';


describe('MainScreen custom hooks', () => {

    const testProducts = [{
        id: 'testId',
        brand: 'testBrand',
        description: 'testDescription',
        image: 'testImage',
        price: 1000
    }];
    const testFirstDiscounts = {
        maxDiscountReached: {brand: 'testBrand1', threshold: 8000, discount: 800},
        maxDiscountPossible: {brand: 'testBrand1', threshold: 8000, discount: 800}
    };

    const testSecondDiscounts = {
        maxDiscountReached: {brand: 'testBrand2', threshold: 10000, discount: 1000},
        maxDiscountPossible: {brand: 'testBrand2', threshold: 10000, discount: 1000}
    };

    afterEach(() => {
        global.fetch.mockClear();
    });
    afterAll(() => {
        global.fetch.mockRestore();
    });

    it('should get products on load', async () => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(testProducts)
        }));
        const {
            result,
            waitForNextUpdate
        } = renderHook(() => useFetchProducts());
        await waitForNextUpdate();
        expect(result.current).toEqual(testProducts);
    })

    it('should get discounts on load and on change brand totals', async (done) => {
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(testFirstDiscounts)
        }));
        const hook = renderHook((brandsTotal) => useGetDiscounts(brandsTotal), {initialProps: {}});
        await hook.waitForNextUpdate();
        expect(hook.result.current).toEqual(testFirstDiscounts);
        global.fetch.mockClear();
        global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(testSecondDiscounts)
        }));
        hook.rerender({testBrand1: 1000});
        await hook.waitForNextUpdate();
        expect(hook.result.current).toEqual(testSecondDiscounts);
        done();
    })
});