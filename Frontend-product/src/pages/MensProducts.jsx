import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';

function MensProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const tempProducts = [
            {
                id: 1,
                name: "Classic T-Shirt",
                price: 19.99,
                category: "T-Shirts",
                gender: "men",
                imageUrl: "/images/5shirts.jpg",
                stockQuantity: 100
            },
            {
                id: 2,
                name: "Slim Fit Jeans",
                price: 59.99,
                category: "Jeans",
                gender: "men",
                imageUrl: "/images/5shirts.jpg",
                stockQuantity: 50
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
            <h1 style={{textAlign: 'center', margin: '20px'}}>Men's Products</h1>
            <ProductList products={products} />
        </div>
    );
}

export default MensProducts;