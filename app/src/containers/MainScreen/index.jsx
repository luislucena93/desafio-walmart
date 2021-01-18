import React, {Fragment, useState} from 'react';
import Header from '../../components/Header/index.jsx';
import ProductsList from '../../components/ProductsList/index.jsx';
import ShoppingCart from '../../components/ShoppingCart/index.jsx';
import {useFetchProducts, useGetDiscounts} from './hooks';

const MainScreen = () => {
        const [selectedProducts, setSelectedProducts] = useState({});
        const [brandsTotals, setBrandTotals] = useState({});
        const [showShoppingCart, setShowShoppingCart] = useState(false);
        const products = useFetchProducts();
        const discounts = useGetDiscounts(brandsTotals);

        const openShoppingCart = () => {
            setShowShoppingCart(true);
        }

        const closeShoppingCart = () => {
            setShowShoppingCart(false);
        }

        const addProduct = (product) => {
            const productCount = selectedProducts[product.id] !== undefined ? selectedProducts[product.id].count : 0;
            const newProduct = {};
            newProduct[product.id] = {count: productCount + 1, info: product};
            setSelectedProducts(prevState => {
                return ({...prevState, ...newProduct})
            });
            const newBrandsTotals = {};
            newBrandsTotals[product.brand] = (brandsTotals[product.brand] || 0) + product.price;
            setBrandTotals(prevState => {
                return ({...prevState, ...newBrandsTotals});
            });
        };

        const removeProduct = (product) => {
            const productCount = selectedProducts[product.id].count - 1;
            const newSelectedProducts = {...selectedProducts};
            if (productCount === 0) {
                delete newSelectedProducts[product.id];
            } else {
                newSelectedProducts[product.id].count = productCount;
            }
            setSelectedProducts({...newSelectedProducts});
            const productBrandTotal = brandsTotals[product.brand] - product.price;
            const newBrandsTotals = {...brandsTotals};
            if (productBrandTotal === 0) {
                delete newBrandsTotals[product.brand];
            } else {
                newBrandsTotals[product.brand] = productBrandTotal;
            }
            setBrandTotals({...newBrandsTotals});
        };

        return (
            <Fragment>
                <ShoppingCart show={showShoppingCart} closeShoppingCart={closeShoppingCart}
                              selectedProducts={selectedProducts} brandTotals={brandsTotals} discounts={discounts}
                              addProduct={addProduct} removeProduct={removeProduct}/>
                <Header selectedProducts={selectedProducts} openShoppingCart={openShoppingCart}/>
                <ProductsList products={products} addProduct={addProduct} removeProduct={removeProduct}
                              selectedProducts={selectedProducts}/>
            </Fragment>
        )
    }
;

export default MainScreen;