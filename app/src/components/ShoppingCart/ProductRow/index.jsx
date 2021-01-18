import React from 'react';
import './styles.scss';
import FormatMoney from '../../../helpers/formatters';

const ProductRow = (props) => {
    const {product, removeProduct, addProduct} = props;
    return (
        <div className={"productRow"}>
            <img src={`http://${product.info.image}`}/>
            <div className={"productSummary"}>
                <p className={"bold"}>{product.info.brand}</p>
                <p>{product.info.description}</p>
                <p>${FormatMoney(product.info.price)}</p>
                <p className={"bold"}>Cantidad: {product.count}</p>
            </div>
            <div className={"productTotal"}>
                <p className={"bold"}>${FormatMoney(product.count * product.info.price)}</p>
                <div className={"addRemoveButtons"}>
                    <button onClick={() => removeProduct(product.info)}>-</button>
                    <p>{product.count}</p>
                    <button onClick={() => addProduct(product.info)}>+</button>
                </div>
            </div>
        </div>
    )
};

export default ProductRow;