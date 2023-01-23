import React, { useEffect } from 'react'
import img1 from '../img1.jpg'
import img2 from '../img2.jpg'
import img3 from '../img3.jpg'
import '../App.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (props) => {

    useEffect(() => {
        if (localStorage.getItem('token')) {
            toast.success("You are Logged In");
        } else {
            toast.info("You are Logged Out Please Login to continue");
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false} />
            <div id="carouselExampleCaptions" style={{ backgroundColor: "skyblue" }} className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active h-50">
                        <img src={img1} className="d-block w-100 h-75" alt="..." />
                        <div className="carousel-caption d-none d-md-block min-vh-100">
                            <h3>Sentiment Diary</h3>
                            <p>Sentiment Diary is your diary on cloud. You can enter the record of your day to day activties in this diary. <strong>The main feature of this diary is that you can analyse your emotions based on the text you have entered into the record</strong> </p>
                        </div>
                    </div>
                    <div className="carousel-item h-50">
                        <img src={img2} className="d-block w-100 h-75" alt="..." />
                        <div className="carousel-caption d-none d-md-block min-vh-100">
                            <h3>Add a Diary</h3>
                            <p>You can simply click on this button to add a diary of your own</p>
                            <Link className="btn btn-primary" role="button" to="/adddiary">Add Diary</Link>
                        </div>
                    </div>
                    <div className="carousel-item h-50">
                        <img src={img3} className="d-block w-100 h-75" alt="..." />
                        <div className="carousel-caption d-none d-md-block min-vh-100">
                            <h3>View Your Diary</h3>
                            <p>You can simpl click on this button to view your diary.</p>
                            <Link className="btn btn-primary" role="button" to="/viewdiary">View Diary</Link>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Home
