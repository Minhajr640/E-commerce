import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import privateApi from "../../services/PrivateAxios.jsx";
import './CheckoutSuccess.css';


function CheckoutSuccessC() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [deliveryMessage, setDeliveryMessage] = useState('');

    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        if(sessionId) {
            verifySession(sessionId);
        }

    }, [searchParams]);

    const verifySession = async (sessionId) => {
        try{
            const response = await privateApi.post('/checkout/verify', {sessionId});
            console.log(`CheckoutSuccess recieved session id : ${sessionId}`)
            setSuccessMessage(response.data.successMessage);
            console.log(`success message: ${successMessage}`)
            setDeliveryMessage(response.data.expectedDeliveryMessage);
            console.log(`expected delivery message ${deliveryMessage}`);
            setVerifying(false);
        } catch (error) {
            console.error('Verification error: ', error);
            setVerifying(false);
        }
    }

    return (
        <div className="success-container">
            {verifying ? (
                <p>Verifying payment...</p>
            ) : (
                <div className="success-messages">
                    <h1>Payment Successful!</h1>
                    {successMessage && (
                        <p>{successMessage}</p>
                    )}
                    {deliveryMessage && (
                        <p>{deliveryMessage}</p>
                    )}
                    <button onClick={() => navigate('/')}>Continue Shopping</button>
                </div>
            )
        }
        </div>
    )
}

export default CheckoutSuccessC