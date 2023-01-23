import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let password = document.getElementById('password');
        let cpassword = document.getElementById('cpassword');

        // if (password !== cpassword) {
        //     document.getElementById('passwordHelp').style.display = "block";
        //     setCredentials({ name: "", email: "", password: "", cpassword: "" })
        // } else {

            
        // }

        

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            // props.showType("success")
            toast.success("Account Created Successfully")
        }
        else {
            // props.showType("error")
            toast.error("Invalid Credentials or User already exists")
        }
        setCredentials({ name: "", email: "", password: "", cpassword: "" })
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className="container mt-2">
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false} />
            <h2 className="my-lg-5" style={{ display: "inline-block", position: "relative", top: "rem" }}>Create an Account to Continue ...</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={credentials.name} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} minLength={5} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
                    <div id="passwordHelp" className="form-text" style={{ display: 'none', color: "red" }}>The Password and Correct password did'nt match</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Register
