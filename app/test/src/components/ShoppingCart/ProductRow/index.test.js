import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import ProductRow from "../../../../../../app/src/components/ShoppingCart/ProductRow/index";

describe('ProductRow component', () => {

    let mockAddProduct;
    let mockRemoveProduct;
    const testSelectedProduct = {
        count: 2,
        info: {id: 'testId', brand: 'testBrand', description: 'testDescription', image: 'testImage', price: 1000}
    };

    beforeEach(() => {
        mockAddProduct = jest.fn();
        mockRemoveProduct = jest.fn();
    });

    it('should render ProdcutDisplay correctly for product with quantity 0', () => {
        const {container} = render(<ProductRow product={testSelectedProduct} addProduct={mockAddProduct}
                                               removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });

    it('should call addProduct function when click the button "+"', () => {
        render(<ProductRow product={testSelectedProduct} addProduct={mockAddProduct}
                           removeProduct={mockRemoveProduct}/>);
        fireEvent.click(screen.getByText('+'));
        expect(mockAddProduct).toHaveBeenCalledWith(testSelectedProduct.info);
    })

    it('should call deleteProduct function when click the button "-"', () => {
        render(<ProductRow product={testSelectedProduct} addProduct={mockAddProduct}
                           removeProduct={mockRemoveProduct}/>);
        fireEvent.click(screen.getByText('-'));
        expect(mockRemoveProduct).toHaveBeenCalledWith(testSelectedProduct.info);
    })

});