import React from 'react';
import { Link } from 'react-router-dom';
import img3 from '../img3.jpg'

const DiaryItem = (props) => {

    let { id, title, record, date, updatedAt, deleteDiary,updateDiary } = props;

    let createdAt = new Date(date).toLocaleString()

    return (
        <div className="container">
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={img3} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{title}... <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{createdAt}
                    </span></h5>
                    <p className="card-text">{record}...</p>
                    <p className="card-text"><small className="text-muted">Updated On {new Date(updatedAt).toLocaleString()}</small></p>
                    <Link role='button' to={{ pathname: `/viewdiary/diary/${id}`, state: { ids: id } }} className="btn btn-sm btn-dark">Read More</Link>
                    <span className="mx-5">
                        <i className="far fa-edit mx-4" style={{cursor:"pointer"}} onClick={()=>{updateDiary(id)}}></i>
                        <i className="far fa-trash-alt " style={{cursor:"pointer"}} onClick={()=>{deleteDiary(id)}}></i>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default DiaryItem
