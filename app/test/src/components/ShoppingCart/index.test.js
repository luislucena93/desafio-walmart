import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import ShoppingCart from "../../../../../app/src/components/ShoppingCart/index";

describe('ShoppingCart component', () => {

    let mockCloseShoppingCart;
    let mockAddProduct;
    let mockRemoveProduct;
    const testSelectedProduct = {
        testId: {
            count: 2,
            info: {id: 'testId', brand: 'testBrand', description: 'testDescription', image: 'testImage', price: 1000}
        }
    };
    const testBrandTotals = {testBrand: 1000};
    let testDiscounts;

    beforeEach(() => {
        mockCloseShoppingCart = jest.fn();
        mockAddProduct = jest.fn();
        mockRemoveProduct = jest.fn();
        testDiscounts = {maxDiscountReached: null, maxDiscountPossible: null};
    });

    it('should render ShoppingCart correctly if show is false', () => {
        const {container} = render(<ShoppingCart show={false} selectedProducts={testSelectedProduct}
                                                 closeShoppingCart={mockCloseShoppingCart} brandTotals={testBrandTotals}
                                                 discounts={testDiscounts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });

    it('should render ShoppingCart correctly if show is true', () => {
        const {container} = render(<ShoppingCart show={true} selectedProducts={testSelectedProduct}
                                                 closeShoppingCart={mockCloseShoppingCart} brandTotals={testBrandTotals}
                                                 discounts={testDiscounts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toMatchSnapshot();
    });

    it('should show discount suggestion and not show applied discount if it has maxDiscountPossible and not maxDiscountReached', () => {
        testDiscounts.maxDiscountPossible = {threshold: 10000, discount: 1000, brand: 'testBrand'};
        const {container} = render(<ShoppingCart show={true} selectedProducts={testSelectedProduct}
                                                 closeShoppingCart={mockCloseShoppingCart} brandTotals={testBrandTotals}
                                                 discounts={testDiscounts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toHaveTextContent(/Agrega \$9.000 mas en productos testBrand y aprovecha un descuento total de \$1.000 en tu compra!/i);
        expect(container).not.toHaveTextContent(/Descuento por marca/i)
    });

    it('should show discount suggestion and applied discount if maxDiscountPossible and maxDiscountReached brand are different', () => {
        testDiscounts.maxDiscountPossible = {threshold: 10000, discount: 1000, brand: 'testBrand'};
        testDiscounts.maxDiscountReached = {threshold: 8000, discount: 800, brand: 'testBrand1'};
        const {container} = render(<ShoppingCart show={true} selectedProducts={testSelectedProduct}
                                                 closeShoppingCart={mockCloseShoppingCart} brandTotals={testBrandTotals}
                                                 discounts={testDiscounts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).toHaveTextContent(/Agrega \$9.000 mas en productos testBrand y aprovecha un descuento total de \$1.000 en tu compra!/i);
        expect(container).toHaveTextContent(/Descuento por marca-\$800/i);
        expect(container).toHaveTextContent(/Se aplicó un descuento de \$800 por haber comprado al menos \$8.000 en productos testBrand1/i)
    });

    it('should not show discount suggestion if maxDiscountPossible and maxDiscountReached are equal', () => {
        testDiscounts.maxDiscountPossible = {threshold: 10000, discount: 1000, brand: 'testBrand'};
        testDiscounts.maxDiscountReached = {threshold: 10000, discount: 1000, brand: 'testBrand'};
        const {container} = render(<ShoppingCart show={true} selectedProducts={testSelectedProduct}
                                                 closeShoppingCart={mockCloseShoppingCart} brandTotals={testBrandTotals}
                                                 discounts={testDiscounts}
                                                 addProduct={mockAddProduct}
                                                 removeProduct={mockRemoveProduct}/>);
        expect(container).not.toHaveTextContent(/Agrega \$9.000 mas en productos testBrand y aprovecha un descuento total de \$1.000 en tu compra!/i);
    });

    it('should call close shopping cart function after 500ms only when click on overlay outside shopping cart', () => {
        jest.useFakeTimers();
        render(<ShoppingCart show={true} selectedProducts={testSelectedProduct}
                             closeShoppingCart={mockCloseShoppingCart} brandTotals={testBrandTotals}
                             discounts={testDiscounts}
                             addProduct={mockAddProduct}
                             removeProduct={mockRemoveProduct}/>);
        fireEvent.click(screen.getByTestId('cart'));
        expect(mockCloseShoppingCart).not.toHaveBeenCalled();
        fireEvent.click(screen.getByTestId('overlay'));
        jest.runAllTimers();
        expect(mockCloseShoppingCart).toHaveBeenCalled();
        jest.useRealTimers();
    });

});