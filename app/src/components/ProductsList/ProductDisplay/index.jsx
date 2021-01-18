import React from 'react';
import './styles.scss';
import FormatMoney from '../../../helpers/formatters';

const ProductDisplay = (props) => {
    const {product, addProduct, removeProduct, productQty} = props;

    const getButton = () => {
        if (productQty === 0) {
            return <button onClick={() => addProduct(product)} className={"addButton"}>Agregar</button>
        }
        return (
            <div className={"addRemoveButtons"}>
                <button onClick={() => removeProduct(product)} data-testid={"removeProduct"}>-</button>
                <p>{productQty}</p>
                <button onClick={() => addProduct(product)} data-testid={"addProduct"}>+</button>
            </div>);
    }

    return (
        <div className={"productDisplay"}>
            <div>
                <img className={'thumbnail'} src={`http://${product.image}`}/>
                <div className={"separator"}/>
                <p className={"productDescription"}><span>{product.brand}</span> {product.description}</p>
                <p className={"price"}>${FormatMoney(product.price)}</p>
            </div>
            {getButton()}
        </div>
    )
}

export default ProductDisplay;