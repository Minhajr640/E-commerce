import LoginC from "../components/login/LoginC"

function LoginPage({setLoggedIn, setProfile}) {

    return (
        <>
            <LoginC setLoggedIn={setLoggedIn} setProfile={setProfile}/>
        </>
    )
}

export default LoginPage