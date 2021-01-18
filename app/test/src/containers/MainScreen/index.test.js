import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import MainScreen from "../../../../../app/src/containers/MainScreen/index";
import * as hooks from '../../../../../app/src/containers/MainScreen/hooks';

describe('MainScreen container', () => {


    const testProducts = [{
        _id: 'testId',
        id: 'testId',
        brand: 'testBrand',
        description: 'testDescription',
        image: 'testImage',
        price: 1000
    }];
    const testDiscounts = {
        maxDiscountReached: {brand: 'testBrand', threshold: 10000, discount: 1000},
        maxDiscountPossible: {brand: 'testBrand', threshold: 10000, discount: 1000}
    };

    beforeAll(() => {
        jest.spyOn(hooks, 'useFetchProducts').mockImplementation(() => {
            return testProducts;
        });
        jest.spyOn(hooks, 'useGetDiscounts').mockImplementation(() => {
            return testDiscounts;
        });
    })

    afterAll(() => {
        jest.clearAllMocks();
    })


    it('should render MainScreen correctly', () => {

        const container = render(<MainScreen/>);
        expect(container).toMatchSnapshot();

    });

    it('should simulate data flow', () => {
        jest.useFakeTimers();
        render(<MainScreen/>);
        act(() => {
            fireEvent.click(screen.getByText("Agregar"));
        });
        expect(screen.getByTestId("totalProducts")).toHaveTextContent("1");
        act(() => {
            fireEvent.click(screen.getByTestId("addProduct"));
        });
        expect(screen.getByTestId("totalProducts")).toHaveTextContent("2");
        act(() => {
            fireEvent.click(screen.getByAltText("shoppingCartIcon"));
        });
        expect(screen.getByTestId("overlay")).toHaveClass("show");
        act(() => {
            fireEvent.click(screen.getByTestId("overlay"));
            jest.runAllTimers();
        });
        expect(screen.getByTestId("overlay")).not.toHaveClass("show");
        act(() => {
            fireEvent.click(screen.getByTestId("removeProduct"));
        });
        expect(screen.getByTestId("totalProducts")).toHaveTextContent("1");
        act(() => {
            fireEvent.click(screen.getByTestId("removeProduct"));
        });
        expect(screen.getByTestId("totalProducts")).toHaveTextContent("0");
        jest.useRealTimers();
    });
});