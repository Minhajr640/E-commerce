import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter';
import { searchProductsByName, getProductsByPriceRange } from '../services/productService';
import '../pages/CategoryProducts.css';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query && !minPrice && !maxPrice) {
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                let data;

                if (minPrice && maxPrice) {
                    
                    data = await getProductsByPriceRange(minPrice, maxPrice);
                   
                    if (query) {
                        data = data.filter(p => 
                            p.name.toLowerCase().includes(query.toLowerCase())
                        );
                    }
                } else if (query) {
                    data = await searchProductsByName(query);
                }

                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Error searching products:', err);
                setError('Failed to search products');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query, minPrice, maxPrice]);

    if (loading) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Searching...</div>;
    }

    if (error) {
        return <div style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error}</div>;
    }

    return (
        <div className="category-products-container">
            <Filter />
            <div className="products-section">
                <h1 style={{textAlign: 'center', margin: '30px 0'}}>
                    {query ? `Search Results for "${query}"` : 'Filtered Products'}
                </h1>
                {products.length === 0 ? (
                    <div style={{textAlign: 'center', padding: '50px', color: '#7f8c8d'}}>
                        No products found
                    </div>
                ) : (
                    <ProductList products={products} />
                )}
            </div>
        </div>
    );
}

export default SearchResults;