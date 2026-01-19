import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import './SignUpC.css';
import axios from 'axios'


function SignUpC() {

    const form = useForm();
    const {register, handleSubmit,watch, formState: {errors }} = form;
    const navigate = useNavigate();
    const password = watch("password");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        setHasSubmitted(true);
        const {passwordConf, ...formdata} = data;
        console.log(formdata);
        try{
            await axios.post('http://localhost:8080/sense/signup', formdata);
            navigate('/login')
        } catch (error) {
            setErrorMessage(error.response.data?.message || 'Submission Failed');
            setHasSubmitted(false);
        }
    }

    return(

        <div className="signup-container">
            <h2>Sign Up</h2>
            {errorMessage && (
                <p className="error-message">{errorMessage}</p>
            )}
            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
                First Name:
                <input type="text" id="fName" {...register("fName", {required: "First name is required", validate: value=> value.trim() !== "" || "First name cannot be empty"})}></input>
                {errors.fName && <p className="error-message">{errors.fName.message}</p>}
            </label>
            <label>
                Last Name:
                <input type="text" id="lName" {...register("lName", {required:"Last name is required", validate: value=> value.trim() !== "" || "Last name cannot be empty"})}></input>
                {errors.lName && <p className="error-message">{errors.lName.message}</p>}
            </label>
            <label>
                Birthdate:
                <input type="date" id="birthdate" {...register("birthdate", {required: "Birthdate is required"})}></input>
                {errors.birthdate && <p className="error-message">{errors.birthdate.message}</p>}
            </label>

            <label>
                Username:
                <input type="text" id="username" {...register("username", {required: "Username is required", validate: value=> value.trim() !== "" || "userName cannot be empty"})}></input>
                {errors.username && <p className="error-message">{errors.username.message}</p>}
            </label>
            <label>
                Password:
                <input type="password" id="password" {...register("password",{required: "Password is required",
                                minLength: {value: 6,message: "Password must be at least 6 characters"},
                                validate: value => value.trim() !== "" || "Password cannot be empty"})}>
                </input>
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </label>
            <label>
                Confirm Password:
                <input type="password" {...register("passwordConf", {required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"})}></input>
                {errors.passwordConf && <p className="error-message">{errors.passwordConf.message}</p>}
            </label>
            <button className="signup-button" type="submit" disabled={hasSubmitted}>Submit</button>
            </form>
        </div>
    )

}

export default SignUpC