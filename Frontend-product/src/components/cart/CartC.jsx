
import privateApi from "../../services/PrivateAxios.jsx";
import { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import './CartC.css';



function CartC({profile}) {

    const [loading, setLoading] = useState(false);
    const [checkoutCart, setCheckoutCart] = useState([]);
    const [checkoutAlert, setCheckoutAlert] = useState('');
    const navigate = useNavigate();


    const cart = profile?.cart;
    useEffect(() => {
        if (cart && cart.length > 0) {
            setCheckoutCart(cart);
        }
    }, [cart])
    if(!cart || cart.length === 0) {
        return (
            <div>
                <p>Your cart is empty</p>
            </div>
        )
    }

    const handleRemove = async (id) => {
        setLoading(true);
        try{
            const response = await privateApi.delete(`/profile/cart/remove/${id}`);
            console.log(response.data);
            window.location.reload();
        } catch(error) {
        } finally {setLoading(false)};
    }
    

    const handleCheckboxChange = (item, isChecked) => {
        if (isChecked) {
            setCheckoutCart([...checkoutCart, item]);
        } else {
            setCheckoutCart(checkoutCart.filter(cartItem => cartItem.id !== item.id));
        }
    };


    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const calculateCheckoutCartTotal = () => {
        return checkoutCart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };


    const handleProceedToCheckout = () => {
        if (checkoutCart.length === 0) {
            setCheckoutAlert("Please select an item to chekcout");
            return;
        }
        navigate('/checkout/shipping', {state: {checkoutCart}})
    }

    return(
        <div className="cart-container">
        <div>
            <h2 className="cart-header">Your Cart </h2>
            <ul className="cart-grid">
                {cart.map((item) => (
                    <li key={item.id} className="cart-product">
                        <img src={item.imageUrl} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                        <Link to={`/product/${item.id}`}>
                            <button className="cart-button">View Details</button>
                        </Link>
                        <button className="cart-button" onClick={() => handleRemove(item.id)}>Remove Item </button>
                        <label className="checkout-label"> Checkout this item?
                        <input type="checkbox" defaultChecked onChange={(e) => handleCheckboxChange(item, e.target.checked)}></input>
                        </label>
                    </li>
                ))}
            </ul>
        </div>

        <div>
                <h3>Cart Total: ${calculateTotal()}</h3>
                <h3>Checkout Total: ${calculateCheckoutCartTotal()}</h3>
                <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
                {checkoutAlert && (
                    <p>{checkoutAlert}</p>
                )}
                
        </div>
    </div>
    )
}
export default CartC