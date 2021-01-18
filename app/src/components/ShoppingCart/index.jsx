import React, {useState, useEffect} from 'react';
import './styles.scss';
import ProductRow from './ProductRow/index.jsx';
import FormatMoney from '../../helpers/formatters';

const ShoppingCart = (props) => {
    const {show, closeShoppingCart, selectedProducts, brandTotals, discounts, addProduct, removeProduct} = props;
    const [open, setOpen] = useState(false);
    let subtotal = 0;
    Object.keys(selectedProducts).forEach((key) => {
        subtotal += selectedProducts[key].count * selectedProducts[key].info.price;
    });

    useEffect(() => {
        if (show) {
            setOpen(true);
        }
    }, [show]);

    const waitToClose = (e) => {
        if (e.target !== e.currentTarget) return;
        setOpen(false);
        setTimeout(() => {
            closeShoppingCart()
        }, 500);
    };

    const getDiscountSuggestion = () => {
        if (discounts.maxDiscountPossible && (!discounts.maxDiscountReached || discounts.maxDiscountReached.brand !== discounts.maxDiscountPossible.brand)) {
            return (
                <p className={"discuountSuggestion"}>
                    Agrega&nbsp;
                    <span>${FormatMoney(discounts.maxDiscountPossible.threshold - brandTotals[discounts.maxDiscountPossible.brand])}</span>&nbsp;
                    mas en productos {discounts.maxDiscountPossible.brand} y aprovecha un descuento total de&nbsp;
                    <span>${FormatMoney(discounts.maxDiscountPossible.discount)}</span> en tu compra!
                </p>
            )
        }
        return null
    };

    const getProductsSubtotal = () => {
        return (
            <div className={"labelAmount"}>
                <p>Subtotal de productos</p>
                <p>${FormatMoney(subtotal)}</p>
            </div>
        )
    };

    const getProductsTotal = () => {
        const total = discounts.maxDiscountReached ? subtotal - discounts.maxDiscountReached.discount : subtotal;
        return (
            <div className={"labelAmount total"}>
                <p>Total a pagar</p>
                <p>${FormatMoney(total)}</p>
            </div>
        )
    };

    const getAppliedDiscount = () => {
        if (discounts.maxDiscountReached) {
            return (
                <div>
                    <div className={"labelAmount appliedDiscount"}>
                        <p>Descuento por marca</p>
                        <p>-${FormatMoney(discounts.maxDiscountReached.discount)}</p>
                    </div>
                    <p className={"discountText"}>
                        Se aplicó un descuento de <span>${FormatMoney(discounts.maxDiscountReached.discount)}</span> por
                        haber&nbsp;
                        comprado al menos <span>${FormatMoney(discounts.maxDiscountReached.threshold)}</span> en&nbsp;
                        productos {discounts.maxDiscountReached.brand}
                    </p>
                </div>
            )
        }
        return null;
    };

    return (
        <div className={`overlay ${show ? 'show' : ''}`} onClick={waitToClose} data-testid={'overlay'}>
            <div className={`cart ${open ? 'open' : ''}`} id={"cart"} data-testid={'cart'}>
                <div className={"cartContent"}>
                    <p className={"title"}>Resumen</p>
                    <div className={"selectedProductsList"}>
                        {
                            Object.keys(selectedProducts).map((key, i) => <ProductRow key={i}
                                                                                      product={selectedProducts[key]}
                                                                                      addProduct={addProduct}
                                                                                      removeProduct={removeProduct}/>)
                        }
                    </div>
                    <div className={"totals"}>
                        {getDiscountSuggestion()}
                        {getProductsSubtotal()}
                        {getAppliedDiscount()}
                        {getProductsTotal()}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShoppingCart;