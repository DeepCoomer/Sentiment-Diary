import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

const AddDiary = (props) => {

    const host = "http://localhost:5000"

    let history = useHistory();

    const [diary, setDiary] = useState({ title: "", record: "" })


    const onChange = (e) => {
        setDiary({ ...diary, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push("/adddiary");
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const addDiary = async (title, record) => {

        // API Call

        const response = await fetch(`${host}/api/diary/adddiary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, record }),
        });

        let json = await response.json();

        console.log(json)

        props.showToast("Diary added Successfully");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addDiary(diary.title, diary.record);
        setDiary({ title: "", record: "" });
    }

    return (
        <div className="container my-5"> <br />
            <h3 className="text-center mt-4">Add a Diary</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" name="title" value={diary.title} onChange={onChange} aria-describedby="emailHelp" minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Record" className="form-label">Record:</label>
                    <textarea name="record" id="record" className="form-control" value={diary.record} onChange={onChange} cols="30" rows="10" minLength={20}></textarea>
                </div>
                <button disabled={diary.title.length<5 || diary.record.length<20} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Diary</button>
            </form>
        </div>
    )
}

export default AddDiary
