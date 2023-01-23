import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

const Account = () => {

    const [account, setAccount] = useState({ name: "", email: "", date: "" })

    let history = useHistory();

    const getUser = async () => {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        });
        let json = await response.json();
        setAccount({ name: json.name, email: json.email, date: json.date })
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getUser();
        }
        else{
            history.push('/login');
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <h2 className="text-center my-5">My Account</h2>
            <div className="card text-center" style={{ width: "18rem", height:"15rem", display: "inline-block", position: "relative", left: "40rem", top: "5rem" }}>
                <div className="card-body">
                    <h4 className="card-header"><i class="fas fa-solid fa-user"></i></h4> <br /> <br />
                    <h5 className="card-title">{account.name}</h5>
                    <p className="card-text">{account.email}</p>
                    <p className="card-text">{new Date(account.date).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Account
