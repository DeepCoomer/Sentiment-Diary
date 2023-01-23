import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        Promise.all([
            await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
                .then(async (response) => await response.json())
                .then((response) => {
                    if (response.success) {
                        // Save the auth token and redirect
                        localStorage.setItem('token', response.authtoken);
                        history.push("/");
                        // props.showType("success")
                        // props.showToast("Logged In Successfully")
                    }
                    else {
                        // props.showType("error")
                        // props.showToast("Invalid Credentials")
                        toast.error("Invalid Credentials")
                    }
                    setCredentials({ email: "", password: "" })
                })
        ])
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container mt-3 ">
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false} />
            <h2 className="my-lg-5" style={{ display: "inline-block", position: "relative", top: "2rem" }}>Login to Continue ...</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <br />
            <p>Don't have an account? <Link to="/register">Register here..</Link></p>
        </div>
    )
}

export default Login
