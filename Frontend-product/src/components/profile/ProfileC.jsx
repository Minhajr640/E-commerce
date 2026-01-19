import { useEffect } from "react";
import { Link } from "react-router-dom";
import './ProfileC.css';





function ProfileC({profile, refreshProfile}) {

    useEffect( () => {
        refreshProfile();
    }, [refreshProfile]);

    if (!profile) {
        return <div>Loading profile...</div>;
    }


    return( 
            <div className="profile-container-a">
                <div>
                <div className="profile-info">
                    <p>First name: {profile.fname}</p>
                    <p>Last name: {profile.lname}</p>
                    <p>Birthdate: {profile.birthdate}</p>
                    <p>Username: {profile.username}</p>
                    <div>
                    <h3>Saved Addresses:</h3>
                    {profile.customerAddresses && profile.customerAddresses.length > 0 ? (
                        profile.customerAddresses.map((address, index) => (
                            <div key={index}>
                                <h6>{address.addressNickname}</h6>
                                <p>{address.street}, {address.city}, {address.state} {address.zipcode}</p>
                            </div>
                        ))
                    ) : (
                        <p>No saved addresses</p>
                    )}
                    </div>
                </div>
                <div className="profile-orders">
                    <h3>Past Orders</h3>
                    {profile.customerOrders && profile.customerOrders.length > 0 ? (
                        profile.customerOrders.map((order, index) => (
                            <div className="profile-order-info"key={order.orderId}>
                                <h5>Order ID - #{order.orderId}</h5>
                                <p>Order Date: {new Date(order.orderDate).toLocaleDateString('en-US')}</p>
                                <p>Delivery To: {order.orderAddress}</p>
                                <p>Expected By: {new Date(order.projectedDelivery).toLocaleDateString('en-US')}</p>
                                <p>Order Total: ${order.orderAmount/100}</p>
                                <div className="order-items">
                                {order.orderedProducts && order.orderedProducts.length> 0 ? (
                                    order.orderedProducts.map((product, index) => (
                                        <div className="product-card" key={index}>
                                        <img src={product.imageUrl} alt={product.name} />
                                        <h3>{product.name}</h3>
                                        <p className="price">${product.price.toFixed(2)}</p>
                                        <Link to={`/product/${product.id}`}>
                                            <button className="view-details">View Details</button>
                                        </Link>
                                        </div>
                                    ))
                                ) : (<p>Products could not load</p>)}
                                </div>
                            </div>
                        
                        ))
                    ) : (
                        <p>No Orders yet</p>
                    ) }
                </div>
                </div>
            </div>

    )
}
export default ProfileC;