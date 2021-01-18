import {useEffect, useState} from 'react';

const useFetchProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products', {method: 'get'})
            .then((response) => {
                response.json()
                    .then((products) => {
                        setProducts(products);
                    })
            })
    }, []);

    return products;
};

const useGetDiscounts = (brandsTotals) => {
    const [discounts, setDiscounts] = useState({maxDiscountReached: null, maxDiscountPossible: null});
    useEffect(() => {
        fetch('/api/discounts', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(brandsTotals)
        }).then((response) => {
            response.json()
                .then((discounts) => {
                    setDiscounts(discounts);
                })
        })
    }, [brandsTotals]);
    return discounts;
}

export {useFetchProducts, useGetDiscounts};