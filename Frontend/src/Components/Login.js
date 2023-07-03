import '../CSS/Login.css';
import React, { useEffect, useState } from 'react'
import warning from '../Images/warning.png'
import { useNavigate, Link } from 'react-router-dom';
export default function Login() {

    const [usernameorEmail, setUsernameorEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("users");
        if (auth) {
            navigate('/')
        }
    }, [])

    const collectData = async (e) => {
        e.preventDefault();
        if (!usernameorEmail || !password) {
            setError("Enter Correct Credentials.");
            return;
        } else {
            let response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                body: JSON.stringify({ usernameorEmail, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            response = await response.json();
            if (response.auth) {
                localStorage.setItem("users", JSON.stringify(response.user));
                localStorage.setItem("auth", JSON.stringify(response.auth));
                navigate("/");
            } else {
                setError(response.errors);
            }
        }
    }
    return (
        <>
            <div className="container login-container">
                <h3 className="loginText mt-3">Login</h3>

                <hr />

                <form>
                    <div className="mb-4">
                        <label className="form-label">Username or Email:</label>
                        <input type="text" value={usernameorEmail} onChange={(e) => {
                            setUsernameorEmail(e.target.value)
                            setError("")
                        }} className="form-control" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Password:</label>
                        <input type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }} className="form-control" />
                    </div>
                    <div className="verifyText">
                        <p>Not a Member? <Link to="/signup">SignUp</Link></p>
                    </div>
                    <div className="submitButton mb-3">
                        <button type="submit" onClick={collectData} className="btn btn-dark">Login</button>
                    </div>
                    {error && <span><img src={warning} alt="" />{error}</span>}
                </form>
            </div>
        </>
    )
}
