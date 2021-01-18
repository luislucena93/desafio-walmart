import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import ProductDisplay from "../../../../../../app/src/components/ProductsList/ProductDisplay/index";

describe('ProductDisplay component', () => {

    let mockAddProduct;
    let mockRemoveProduct;
    const testProduct = {
        id: 'testId',
        brand: 'testBrand',
        description: 'testDescription',
        image: 'testImage',
        price: 1000
    };

    beforeEach(() => {
        mockAddProduct = jest.fn();
        mockRemoveProduct = jest.fn();
    });

    it('should render ProdcutDisplay correctly for product with quantity 0', () => {
        const {container} = render(<ProductDisplay product={testProduct} productQty={0} addProduct={mockAddProduct}
                                                   removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });

    it('should render ProdcutDisplay correctly for product with quantity greater than 0', () => {
        const {container} = render(<ProductDisplay product={testProduct} productQty={2} addProduct={mockAddProduct}
                                                   removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });


    it('should call addProduct function when click the button "Agregar" for product with qty 0', () => {
        render(<ProductDisplay product={testProduct} productQty={0} addProduct={mockAddProduct}
                               removeProduct={mockRemoveProduct}/>);
        fireEvent.click(screen.getByText('Agregar'));
        expect(mockAddProduct).toHaveBeenCalledWith(testProduct);
    })

    it('should call addProduct function when click the button "+" for product with qty greater than 0', () => {
        render(<ProductDisplay product={testProduct} productQty={2} addProduct={mockAddProduct}
                               removeProduct={mockRemoveProduct}/>);
        fireEvent.click(screen.getByText('+'));
        expect(mockAddProduct).toHaveBeenCalledWith(testProduct);
    })

    it('should call deleteProduct function when click the button "-" for product with qty greater than 0', () => {
        render(<ProductDisplay product={testProduct} productQty={2} addProduct={mockAddProduct}
                               removeProduct={mockRemoveProduct}/>);
        fireEvent.click(screen.getByText('-'));
        expect(mockRemoveProduct).toHaveBeenCalledWith(testProduct);
    })

});