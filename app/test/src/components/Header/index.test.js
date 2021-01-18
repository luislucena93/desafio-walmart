import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Header from "../../../../../app/src/components/Header/index";

describe('Header component', () => {

    let mockOpenShopingCart;
    const selectedProducts = {1: {count: 2, info: {}}};

    beforeEach(() => {
        mockOpenShopingCart = jest.fn();
    });

    it('should render header correctly for empty cart', () => {
        const {container} = render(<Header selectedProducts={{}} openShoppingCart={mockOpenShopingCart}/>);
        expect(container).toMatchSnapshot();
    });

    it('sould should render header correctly for cart with 2 products', () => {
        const {container} = render(<Header
            selectedProducts={selectedProducts} openShoppingCart={mockOpenShopingCart}/>);
        expect(container).toMatchSnapshot();
    });

    it('should call open shopping cart function when click in shopping cart icon if cart has products', () => {
        render(<Header selectedProducts={selectedProducts} openShoppingCart={mockOpenShopingCart}/>);
        fireEvent.click(screen.getByAltText('shoppingCartIcon'));
        expect(mockOpenShopingCart).toHaveBeenCalled();
    })

    it('should not call open shopping cart function when click in shopping cart icon if cart is empty', () => {
        render(<Header selectedProducts={{}} openShoppingCart={mockOpenShopingCart}/>);
        fireEvent.click(screen.getByAltText('shoppingCartIcon'));
        expect(mockOpenShopingCart).not.toHaveBeenCalled();
    })
});