import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

function WomensProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tempProducts = [
            {
                id: 3,
                name: "Summer Dress",
                price: 49.99,
                category: "Dresses",
                gender: "women",
                imageUrl: "/images/5shirts.jpg",
                stockQuantity: 75
            }
           
        ];
        
        setProducts(tempProducts);
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', margin: '20px'}}>Women's Products</h1>
            <ProductList products={products} />
        </div>
    );
}

export default WomensProducts;
