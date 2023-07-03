import '../CSS/SignUp.css';
import React, { useEffect, useState } from 'react'
import warning from '../Images/warning.png'
import { useNavigate, Link } from 'react-router-dom';
export default function SignUp() {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem("users");
      if(auth){
        navigate('/')
      }
    }, [])
    
    const collectData = async (e) => {
        e.preventDefault();
        if (!fullname || !username || !email || !password)  {
            setError("Enter Proper Credentials.");
        } else {
            let response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                body: JSON.stringify({ fullname, username, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.auth) {
                localStorage.setItem("users", JSON.stringify(data.data));
                localStorage.setItem("auth", JSON.stringify(data.auth));
                navigate("/");
            } else {
                setError(data.errors);
            }
        }
    };
    return (
        <>
            <div className="container form-container">
                <h3 className="signupText mt-3">SignUp</h3>

                <hr />

                <form>
                    <div className="mb-4">
                        <label className="form-label">Full Name:</label>
                        <input type="text" value={fullname} onChange={(e) => {
                            setFullname(e.target.value);
                            setError("")
                        }} className="form-control" placeholder="John Doe" />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Username:</label>
                        <input type="text" value={username} onChange={(e) => {
                            setUsername(e.target.value)
                            setError("")
                        }} className="form-control" placeholder="john_doe123" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                            setError("")
                        }} className="form-control" placeholder="name@example.com" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Password:</label>
                        <input type="password" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                            setError("")
                        }} className="form-control" placeholder="******" />
                    </div>
                    <div className="verifyText">
                        <p>Already a Member? <Link to="/login">Login</Link></p>
                    </div>
                    <div className="submitButton mb-3">
                        <button type="submit" onClick={collectData} className="btn btn-dark">SignUp</button>
                    </div>
                    {error && <span><img src={warning} alt="" />{error}</span>}
                </form>
            </div>
        </>
    )
}
