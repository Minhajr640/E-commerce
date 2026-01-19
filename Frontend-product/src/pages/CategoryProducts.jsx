import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter';
import { getProductsByCategory, getAllProducts, getProductsByPriceRange } from '../services/productService';
import './CategoryProducts.css';

//This element renders when the url is path="/category/:categoryName" as defined in Apps routes. 
function CategoryProducts() {
    const { categoryName } = useParams();         //categoryName is one of components state which decides which products are shown.
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const minPrice = searchParams.get('minPrice');      //setting min & max price as a state of component.
    const maxPrice = searchParams.get('maxPrice');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let data;

                    //if minPrice & maxPrice have values; statement evaluates to true.(JavaScript truthy)
                if (minPrice && maxPrice) {                                              
                    data = await getProductsByPriceRange(minPrice, maxPrice);
                    // if min and max price is set, filter by price
                    if (categoryName) {
                        data = data.filter(p => p.category?.name === categoryName);
                    }
                } else if (categoryName) {
                    //if category is set, filter further for category
                    data = await getProductsByCategory(categoryName);
                } else {
                    data = await getAllProducts();
                }      //if neither category filter or price filter is set, just get all products.

                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Error ocurred:', err);
                setError('Failed to load');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, minPrice, maxPrice]);  //useEffects dependency array. useEffect re-runs when these values, which represent componenets state, change.

    if (loading) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Loading products</div>;
    }
            //componenets conditional renders
    if (error) {
        return <div style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error}</div>;
    }

    return (
        <div className="category-products-container">
            {/* Filter element injected */}
            <Filter />      
            <div className="products-section">
                {categoryName && (
                    <h1 style={{textAlign: 'center', margin: '30px 0', textTransform: 'capitalize'}}>
                        {/* Show categoryName as heading*/}
                        {categoryName}     
                    </h1>
                )}
                {/*Produce ProductList element and pass in products as array */}
                <ProductList products={products} />
            </div>
        </div>
    );
}

export default CategoryProducts;