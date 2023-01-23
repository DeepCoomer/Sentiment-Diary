import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router';
import DiaryItem from './DiaryItem';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Diaries = (props) => {

    let history = useHistory();

    const host = "http://localhost:5000";

    const diaryInitial = []

    const [diaries, setDiaries] = useState(diaryInitial)

    const [diary, setDiary] = useState({ id: "", etitle: "", erecord: "" })

    const [loading, setLoading] = useState(false)

    const ref = useRef(null)
    const refClose = useRef(null)

    const getDiary = async () => {

        // API Call

        const response = await fetch(`${host}/api/diary/fetchalldiaries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        props.setProg(40);

        const json = await response.json();

        props.setProg(75);

        setDiaries(json);

        props.setProg(100);

        setLoading(false);

        // props.showType("info")
        // props.showToast("Diary Details Loaded Successfully");

    }

    const deleteDiary = async (id) => {

        // API Call

        const response = await fetch(`${host}/api/diary/deletediary/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json()

        console.log(json);

        // console.log("Deleting the Note with id" + id)
        const newDiaries = diaries.filter((diary) => { return (diary._id !== id) })
        setDiaries(newDiaries);
        // props.showType("success")
        // props.showToast("Diary Deleted Successfully");
        toast.success("Diary Deleted Succesfully");
    }

    const editDiary = async (id, title, record) => {

        // API Call

        const response = await fetch(`${host}/api/diary/updatediary/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, record }),
        });
        // eslint-disable-next-line
        const json = await response.json()

        let newDiaries = JSON.parse(JSON.stringify(diaries))

        // Logic to edit an note
        for (let index = 0; index < newDiaries.length; index++) {
            const element = newDiaries[index];
            if (element._id === id) {
                newDiaries[index].title = title;
                newDiaries[index].record = record;
                break;
            }
        }
        setDiaries(newDiaries)
    }

    const updateDiary = async (id) => {

        const response = await fetch(`${host}/api/diary/finddiary/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        let json = await response.json();

        console.log(json._id, json.title, json.record)

        setDiary({ id: json._id, etitle: json.title, erecord: json.record })
        ref.current.click();

    }

    const onChange = (e) => {
        setDiary({ ...diary, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        editDiary(diary.id, diary.etitle, diary.erecord)
        setDiary({ id: "", etitle: "", erecord: "" })
        refClose.current.click();
        // props.showType("success")
        // props.showToast("Updated Successfully")
        toast.success("Diary updated Succesfully");
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getDiary();
            toast.info("Diary Loaded Succesfully");
        }
        else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="container">
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false} />
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ display: "none" }}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Diary</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="mb-3">
                                <div className="mb-3">
                                    <label htmlFor="Title" className="form-label">Title:</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={diary.etitle} onChange={onChange} aria-describedby="emailHelp" minLength={5} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Record" className="form-label">Record:</label>
                                    <textarea name="erecord" id="erecord" className="form-control" value={diary.erecord} onChange={onChange} cols="30" rows="10" minLength={20}></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={diary.etitle.length < 5 || diary.erecord.length < 20} onClick={handleClick} type="button" className="btn btn-primary">Update Diary</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-4">
                <h2 className="text-center my-5">Your Diary Records</h2>
                {loading && <Spinner />}
                <div className="container text-center">
                    {diaries.length === 0 && 'No Diaries to display!'}
                </div>
                {diaries.map((diary) => {
                    return (
                        <div className="col-md-4 my-5" key={diary._id}>
                            <DiaryItem id={diary._id} diary={diary} title={diary.title} record={diary.record.slice(0, 45)} date={diary.date} updatedAt={diary.updatedAt} deleteDiary={deleteDiary} updateDiary={updateDiary} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Diaries
