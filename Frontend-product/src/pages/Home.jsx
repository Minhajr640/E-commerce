import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories, getProductsByCategory } from '../services/productService';
import './Home.css';

function Home() {
    const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    
    // useEffect is an expression that allows me to perform side effect behavior.
    // The side effect of this component is to fetch categories and then fetch list of products for each category but
    //slice the array at index 4 to only show elements (0,1,2,3 (up to element 4 but not element 4)).
    useEffect(() => {                        
        const fetchCategoriesAndProducts = async () => {
            try {
                setLoading(true);
                const categories = await getAllCategories();    //One promise. Wait for this promise to resolve(await).
                // returns an array of categories
                
                const categoriesData = await Promise.all(        // goes through each category in categories array,
                    categories.map(async (category) => {        //fetches 4 products for the category and return an array of categories 
                        try {                                   // with a products field which is an array of 4 products. 
                            const products = await getProductsByCategory(category.name);      //second promise.(relies on data from first promise.)
                            return {
                                ...category,
                                products: products.slice(0, 4) 
                            };
                        } catch (err) {
                            return { ...category, products: [] };
                        }
                    })
                );
                
                setCategoriesWithProducts(categoriesData);         //CategoriesWithProducts is an array of categories with a field "products"
            } catch (error) {                                      //"products" is a field within category thats also an array of 4 products with 
                console.error('Error fetching data:', error);       // its own fields such as price and name. 
            } finally {
                setLoading(false);
            }
        };

        fetchCategoriesAndProducts();
    }, []);

    if (loading) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>;
    }

    return (
    <div className="home-container">         {/* Parent Container in home page*/}
        <h1 className="home-title">Sense Your New Style</h1>       {/* Title element in home page */}
        
        {categoriesWithProducts.map(category => {                   //Escaping to javascript expression 
                                                                    // within JSX to use array method .map() to
            if (category.products.length === 0) return null;        // map out array.
            
            return (
                <div key={category.id} className="category-section">             {/* Return value of JSX Expression that produces one n/ */}
                    <div className="category-header">                 {/* container for header with link to view all products in category*/}
                        <h2>{category.name}</h2>
                        <Link to={`/category/${category.name}`} className="view-all-link">
                            View All →
                        </Link>
                    </div>
                    
                    <div className="products-preview">              {/* Also produces another container to show preview of some products. */}
                        {category.products.map(product => (          // Nested container "products-preview" also calls a JSX expression /n
                            <Link                                    // to map products of category into product cards with link to product.
                                key={product.id} 
                                to={`/product/${product.id}`}
                                className="product-preview-card"
                            >
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p className="price">${product.price.toFixed(2)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            );
        })}
    </div>
    );
}

export default Home;