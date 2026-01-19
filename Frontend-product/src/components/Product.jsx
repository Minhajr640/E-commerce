import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import './Product.css';
import privateApi from "../services/PrivateAxios";

function Product() {
    const { id } = useParams();          //this element renders when the route is /product/{id} as defined in the <routes> tag at home page.
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitMessage, setSubmitMessage] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProductById(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);    //useEffect re-runs when the id state changes.
    //Add to cart button triggers reload so cart can fetch new data
    const addToCart = async (e) => {
        try {
            const response = await privateApi.put(`/profile/cart/add/${id}`);
            setSubmitMessage(response.data);
            alert('Added to cart successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error adding to cart', error);
            setSubmitMessage('Failed to add to cart');
            alert('Failed to add to cart');
        }
    }
    //conditional renders in case the {id} param has issues.
    if (loading) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Loading product...</div>;
    }

    if (error) {
        return <div style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error}</div>;
    }

    if (!product) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Product not found</div>;
    }

    return (
        <div className="product-detail">
            <div className="product-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back
                </button>
                <h1>{product.name}</h1>
                <p className="category">{product.category?.name || 'No Category'}</p>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="description">{product.description}</p>
                <p className="stock">In Stock: {product.stockQuantity}</p>
                <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
                {submitMessage && <p>{submitMessage}</p>}
            </div>
        </div>
    );
}

export default Product;