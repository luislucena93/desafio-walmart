import React from 'react';
import {render} from '@testing-library/react';
import ProductsList from "../../../../../app/src/components/ProductsList/index";

describe('ProductsList component', () => {

    let mockAddProduct;
    let mockRemoveProduct;
    const testProducts = [{
        _id: 'testId',
        id: 'testId',
        brand: 'testBrand',
        description: 'testDescription',
        image: 'testImage',
        price: 1000
    }];
    const selectedProducts = {testId: {count: 2, info: {...testProducts[0]}}};

    beforeEach(() => {
        mockAddProduct = jest.fn();
        mockRemoveProduct = jest.fn();
    });

    it('should render ProductsList correctly for empty list', () => {
        const {container} = render(<ProductsList selectedProducts={{}} products={[]} addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });

    it('should render ProductsList correctly for list with no selected products', () => {
        const {container} = render(<ProductsList selectedProducts={{}} products={testProducts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });

    it('should render ProductsList correctly for list with selected products', () => {
        const {container} = render(<ProductsList selectedProducts={selectedProducts} products={testProducts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });
});