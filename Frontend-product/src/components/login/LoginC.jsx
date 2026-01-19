import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import privateApi from "../../services/PrivateAxios";
import './LoginC.css';


function LoginC({setLoggedIn, setProfile}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            "username": username,
            "password": password
        }
        console.log(loginData);
        try{
            setLoading(true);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('customerId');

            const response = await axios.post('http://localhost:8080/sense/login', loginData);
            const {jwtToken, customerId} = response.data;

            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('customerId', customerId);
            console.log(jwtToken);
            setLoggedIn(true);
            navigate("/")
            fetchProfile();
            
        } catch (error) {
            setErrorMessage(error.response.data?.message || 'Login Failed');
        }
    }
    const fetchProfile = async () => {
        try{
            setError(null);
            console.log("Sending API Profile Data Request ")
            const response = await privateApi.get("/sense/profile");
            console.log("This is response for profile:" ,response);
            console.log("Response status:", response.status);
            console.log("Response data:", response.data);
            setProfile(response.data);
        } catch(errorMsg) {
            console.error("Error fetching account: ", errorMsg);
            setError("Failed to load profile")
        } finally {
            setLoading(false);
        }
    }



    return (
         <div className="login-container">
            <h2>Login</h2>
            {errorMessage && (
                <p>{errorMessage}</p>
            )}
            {error && (
                <p>{error}</p>
            )}
            {loading && (
                <p>Loading Profile...</p>
            )}
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Username: 
                <input type="text" placeholder="Enter Username" value={username}
                            onChange={(e) => setUsername(e.target.value)}></input>
                </label>
                <label>
                    Password: 
                <input type="password" placeholder="Enter Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <button className="login-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginC