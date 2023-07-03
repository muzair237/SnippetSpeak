import '../CSS/Navbar.css';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    const auth = localStorage.getItem("users");

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <>
            <nav data-bs-theme="dark" className="navbar navbar-expand-lg  bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><h4 style={{fontFamily:"DM Serif Display', serif"}}>SnippetSpeak</h4></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {auth ?
                            <>
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/">Explore</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/createblog">Publish a Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/myblogs">My Blogs</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" onClick={logout} aria-current="page" to="/login">Logout ({JSON.parse(auth).fullname})</Link>
                                    </li>
                                </ul>
                            </>
                            :
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
