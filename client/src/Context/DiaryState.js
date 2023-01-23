import React, { useState } from 'react';
import DiaryContext from './DiaryContext';

const DiaryState = (props) => {

    const host = "http://localhost:5000";

    const diaryInitial = []

    const [diaries, setDiaries] = useState(diaryInitial)

    // Get all the diaries

    const getDiary = async () => {

        // API Call

        const response = await fetch(`${host}/api/diary/fetchalldiaries`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()

        setDiaries(json)
    }

    return (
        <DiaryContext.Provider value={{diaries,setDiaries,getDiary}}>
            {props.children}
        </DiaryContext.Provider>
    )
}

export default DiaryState
