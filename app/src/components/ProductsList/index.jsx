import React, {Fragment} from 'react';
import ProductDisplay from './ProductDisplay/index.jsx';
import './styles.scss';

const ProductsList = (props) => {
    const {products, addProduct, removeProduct, selectedProducts} = props;
    return (
        <Fragment>
            <div className={"productsList"}>
                {products.map((product) => <ProductDisplay key={product._id} product={product} addProduct={addProduct}
                                                           removeProduct={removeProduct}
                                                           productQty={selectedProducts[product.id] ? selectedProducts[product.id].count : 0}/>)}
            </div>
        </Fragment>
    )
};

export default ProductsList;