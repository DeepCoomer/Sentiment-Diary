import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = (props) => {

    let location = useLocation();
    let history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push('/home');
        toast.success("Logged Out Succesfully");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Sentiment Diary</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {
                            !localStorage.getItem('token') ?
                                <div className="d-flex">
                                    <Link className="nav-link" role="button" to="/login">Login</Link>
                                    <Link className="nav-link" role="button" to="/register">Register</Link>
                                </div>
                                : <div className="d-flex justify-content-between">
                                    <Link className="nav-link" role="button" to='/account'>Account</Link>
                                    <Link className="nav-link" role="button" to='/login' onClick={handleLogout}>Logout</Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false} />
        </>
    )
}

export default Navbar
