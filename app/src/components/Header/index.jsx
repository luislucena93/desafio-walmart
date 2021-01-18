import React from 'react';
import './styles.scss';
import LogoImage from '../../assets/imgs/liderLogo.png';
import ShoppingCartImage from '../../assets/imgs/shopping-cart.png';

const Header = (props) => {
    const {selectedProducts, openShoppingCart} = props;
    let totalProducts = 0;
    Object.keys(selectedProducts).forEach((key) => {
        totalProducts += selectedProducts[key].count;
    });

    const handleOpenCart = () => {
        if (totalProducts !== 0) {
            openShoppingCart();
        }
    }

    return (
        <div className={"headerBar"}>
            <img alt="Logo" className={"logo"} src={LogoImage}/>
            <div className={"shoppingCart"} onClick={() => handleOpenCart()}>
                <img src={ShoppingCartImage} alt={"shoppingCartIcon"}/>
                <div data-testid={"totalProducts"}>{totalProducts}</div>
            </div>
        </div>
    )
};

export default Header;
