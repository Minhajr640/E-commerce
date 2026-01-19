import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import privateApi from "../../services/PrivateAxios";
import { useLocation } from "react-router-dom";
import './ShippingDetailsC.css';

function ShippingDetailsC({profile}) {

    console.log("Shipping details created")
    console.log("Profile ref:", profile);
    const location = useLocation();
    const checkoutCart = location.state?.checkoutCart || [];
    const form = useForm();
    const {register, handleSubmit, formState: {errors }} = form;
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showDefault, setShowDefault] = useState('');
    const [addNewAddress, setAddNewAddress] = useState(false);
    const [showAddressDropdown, setShowAddressDropdown] = useState(false);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
    
    
    const checkoutInProgress = useRef(false);


    const calculateTotal = () => {
        return checkoutCart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const checkoutTotal = calculateTotal();

    const existingAddresses = profile?.customerAddresses;
    useEffect(() => {
        console.log("USe Effect running")
    if(!existingAddresses || existingAddresses.length === 0) {
        setAddNewAddress(true);
    } else {
        setShowDefault(true);
        setAddNewAddress(false);
    }
    }, [existingAddresses]);

    const onSubmit = async (addressData) => {
        setHasSubmitted(true);
        console.log(addressData);
        try{
            const response = await privateApi.post("/profile/address/new", addressData);
            console.log(response);
            window.location.reload();
        } catch (error) {
            setErrorMessage(error.response.data?.message || 'Submission Failed');
            setHasSubmitted(false);
        } finally {
            setHasSubmitted(false);
        }
    }

    const handleCheckout = async () => {
        console.log("handleCheckout called - START");
        if (checkoutInProgress.current || isCheckoutProcessing) {
            console.log("Checkout already in progress, skipping...");
            return;
        }

        checkoutInProgress.current = true;
        setIsCheckoutProcessing(true);
        const checkoutRequest = {
            checkoutCart : checkoutCart,
            selectedAddressIndex : selectedAddressIndex
        }

        try {
            console.log("Making API request...");
            //This api request fetches a Map with two key value pairs sessionId and Url.
            const response = await privateApi.post('/checkout/create-session', checkoutRequest);
            //Extracting reponse.data.url using object destructuring. 
            const {url} = response.data;

            //Create a form element at the bottom of page that performs GET request to url. 
            //Url is like an endpoint in this case.
            console.log("Creating form for Stripe");
            const form = document.createElement('form');
            form.method = 'GET';
            form.action = url;
            document.body.appendChild(form);
            console.log("Submitting form");
            form.submit();

        } catch (error) {
            console.error('Checkout error: ', error);
            alert('Failed to process checkout');
            checkoutInProgress.current = false;
        }
    };

    const handleSelectedAddress = (index) => {
        setSelectedAddressIndex(index);
        setShowAddressDropdown(false);
    }

    return (
    <div>
        <h2>Confirm Shipping Details</h2>
        <div className="container-a">
        {showDefault && existingAddresses.length > 0 && (
          
            <div className="shipping-details-container">
                <h4>Shipping Address</h4>
                <div className="address-details">
                    <p>{existingAddresses[selectedAddressIndex].addressNickname}</p>
                    <p>{existingAddresses[selectedAddressIndex].street}</p>
                    <p>{existingAddresses[selectedAddressIndex].city}, {existingAddresses[selectedAddressIndex].state}, {existingAddresses[selectedAddressIndex].zipcode}</p>
                    <p>{existingAddresses[selectedAddressIndex].country}</p>
                </div>
                <div className="shipping-details-buttons">
                <p>Checkout Itmes: {checkoutCart?.length}</p>
                <p><strong>Checkout Total:</strong> {checkoutTotal}</p>
                    <button className="shipping-button" id="stripe" onClick={handleCheckout}  disabled={isCheckoutProcessing}>
                        Checkout With Stripe
                    </button>
                </div>
            </div>
        )}
        
        {(existingAddresses?.length > 0) && (
        <div className="different-address-button">
            <button className="shipping-button" onClick={() => setShowAddressDropdown(!showAddressDropdown)}>Select a different address?</button>
            {showAddressDropdown && (
                <div className="address-dropdown">
                    {existingAddresses.map((address, index) => (
                        <div className="dropdown-item" key={index} onClick={() => handleSelectedAddress(index)}>
                            <p>{address.addressNickname}: {address.street}, {address.city}</p>
                        </div>
                    ))}
                    <button className="shipping-button" onClick={() => {setAddNewAddress(!addNewAddress);setShowAddressDropdown(false);}}>
                    {addNewAddress ? 'Cancel' : 'Add New Address'}
                </button>
                </div>
            )}
        </div>
        )}
        </div>

       

        {addNewAddress && (
        <div className="new-address-form-c">
            <h2>Add New Address</h2>
            <form className="new-address-form" onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Nickname:
                    <input type="text" placeholder="Set a nickname for address" {...register("addressNickname", {required: "Nickname is required", validate:value=> value.trim() !== "" || "Nickname cannot be empty"})}></input>
                    {errors.addressNickname && <p className="error-message">{errors.addressNickname.message}</p>}
                </label>
                <label>
                    Street Address:
                    <input type="text" placeholder="Ex: 11-11 1st Ave" {...register("street", {required: "Street number is required", validate:value=> value.trim() !== "" || "Street number cannot be empty"})}></input>
                    {errors.street && <p className="error-message">{errors.street.message}</p>}
                </label>
                <label>
                    City:
                    <input type="text" placeholder="Ex: Albany" {...register("city", {required: "City is required", validate: value=> value.trim() !== "" || "City cannot be empty"})}></input>
                    {errors.city && <p className="error-message">{errors.city.message}</p>}
                </label>
                <label>
                    State:
                    <input type="text" placeholder="Ex: New York" {...register("state", {required: "State is required", validate: value=> value.trim() !== "" || "State cannot be empty"})}></input>
                    {errors.state && <p className="error-message">{errors.state.message}</p>}
                </label>
                <label>
                    Zipcode:
                    <input type="text" placeholder="Ex: 12345" {...register("zipcode", {required: "Zipcode is required", validate: value=> value.trim() !== "" || "Zipcode cannot be empty"})}></input>
                    {errors.zipcode && <p className="error-message">{errors.zipcode.message}</p>}
                </label>
                <label>
                    Country:
                    <input type="text" placeholder="Ex: USA" {...register("country", {required:"Country is required", validate: value=> value.trim() !== "" || "Country cannot be empty"})}></input>
                </label>
                <label>
                    Set this address as default?
                    <input type="checkbox" {...register("isDefault")}></input>
                </label>


                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="new-address-button"type="submit" disabled={hasSubmitted}>Save</button>
            </form>
        </div>
        )}
    </div>
    )
}

export default ShippingDetailsC