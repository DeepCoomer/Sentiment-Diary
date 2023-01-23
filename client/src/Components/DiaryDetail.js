import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router'
import { PieChart } from 'react-minimal-pie-chart';
import Spinner from './Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiaryDetail = (props) => {

    const { state } = useLocation();

    const [diary, setDiary] = useState({ title: "", record: "", date: "" })

    const [score, setScore] = useState(null)
    const [comparative, setComparative] = useState(null)
    const [mood, setMood] = useState("")
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [words, setWords] = useState(0);
    const [loading, setLoading] = useState(false);

    const host = " http://localhost:5000"

    let history = useHistory();

    const fetchDiary = async () => {

        // API Call

        props.setProg(40)

        const response = await fetch(`${host}/api/diary/finddiary/${state.ids}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });

        let json = await response.json();

        props.setProg(75)

        setDiary({ title: json.title, record: json.record, date: json.date })

        props.setProg(100)

    }

    const analyseDiary = async () => {

        // API Call

        setLoading(true);

        props.setProg(40)

        const response = await fetch(`${host}/api/diary/analysediary/${state.ids}`, {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token')
            }
        });

        let json = await response.json();

        props.setProg(60)

        setScore(json.score);
        setComparative(json.comparative);
        setPositive(json.positive.length);
        setNegative(json.negative.length);
        setWords(json.words.length);

        props.setProg(80)

        if (json.positive.length > 0) {
            document.getElementById('positive').innerText = json.positive;
        }
        else {
            document.getElementById('positive').innerText = "No Positive words detected";
        }

        if (json.negative.length > 0) {
            document.getElementById('negative').innerText = json.negative;
        }
        else {
            document.getElementById('negative').innerText = "No Negative words detected";
        }

        if (json.positive.length >= json.negative.length) {
            setMood("Positive Mood");
            document.getElementById('positive').style.color = "green";
            document.getElementById('mood').style.color = "green";
            toast.success("You are in Happy Mood")
        }
        else {
            setMood("Negative Mood");
            document.getElementById('negative').style.color = "red";
            document.getElementById('mood').style.color = "red";
            toast.error("You are in Sad Mood")
        }

        props.setProg(100)

        setLoading(false)

        // props.showType("info")
        // props.showToast("Diary Details Loaded Successfully.")
    }

    const handleSentiment = () => {
        analyseDiary();
        document.getElementById('sentiment').style.display = "block";
        document.getElementById('piechart').style.display = "block";
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchDiary();
            toast.info("Diary Details Loaded")
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
            <h2 className="text-center my-5 pt-4">Diary Details</h2>
            <div className="container border border-2 border-primary px-4 py-4 rounded-3">
                <h4><strong>Title:</strong> <small>{diary.title}</small></h4>
                <h5><strong>Created On:</strong><small> {new Date(diary.date).toLocaleString()}</small> </h5>
            </div>
            <br />
            <div className="container  border border-2 border-primary px-4 py-4 rounded-3">
                <p><strong>Record:</strong> {diary.record}</p>
            </div>
            <div className="text-center my-3">
                <button className="btn btn-primary" onClick={handleSentiment}>Analyse Sentiments</button>
            </div> <br /><br />
            {loading && <Spinner />}
            <div className="text-center my-3" id="sentiment" style={{ display: 'none' }}>
                <b>Score:</b> {score} <br /><br />
                <b>Comparative:</b> {comparative} <br /><br />
                <b>Positive Words:</b> <span id="positive"></span> <br /><br />
                <b>Negative Words:</b> <span id="negative"></span><br /><br />
                <h6>You seem to be in <span id="mood">{mood}</span></h6>
            </div>
            <div id="piechart" style={{ display: "none" }}>
                <PieChart
                    data={[{ value: positive, color: 'Green' }]}
                    totalValue={words}
                    lineWidth={20}
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    labelStyle={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif',
                        fill: 'blue',
                    }}
                    labelPosition={0}
                    radius={20}
                />
                <h2 className="text-center">Positive</h2>
                <PieChart
                    data={[{ value: negative, color: 'Red' }]}
                    totalValue={words}
                    lineWidth={20}
                    label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                    labelStyle={{
                        fontSize: '5px',
                        fontFamily: 'sans-serif',
                        fill: 'blue',
                    }}
                    labelPosition={0}
                    radius={20}
                />
                <h2 className="text-center">Negative</h2>
            </div>
        </div>
    )
}

export default DiaryDetail
