import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Register from './Components/Register';
import Diaries from './Components/Diaries';
import AddDiary from './Components/AddDiary';
import DiaryDetail from './Components/DiaryDetail';
import Account from './Components/Account';
import Toastt from './Components/Toast';
import LoadingBar from 'react-top-loading-bar';


function App() {

  const [toast, setToast] = useState(null);
  const [type, setType] = useState("")
  const [progress, setProgress] = useState(0)

  const setProg = (prog) => {
    setProgress(prog)
  }

  const showToast = (message) => {
      setToast(message);
  }

  const showType = (type) => {
      setType(type);
  }

  return (
    <>
      <Router>
        <Navbar showToast={showToast} showType={showType} />
        <LoadingBar
          color='#f11946'
          progress={progress}
          height={4}
        />
        <Toastt toast={toast} type={type} />
        <div className="">
          <Switch>
            <Route exact path="/">
              <Home showToast={showToast} showType={showType} />
            </Route>
            <Route exact path="/about">
              <About showToast={showToast} showType={showType} />
            </Route>
            <Route exact path="/login">
              <Login showToast={showToast} showType={showType} />
            </Route>
            <Route exact path="/register">
              <Register showToast={showToast} showType={showType} />
            </Route>
            <Route exact path="/viewdiary">
              <Diaries showToast={showToast} showType={showType} setProg={setProg} />
            </Route>
            <Route exact path="/adddiary">
              <AddDiary showToast={showToast} showType={showType} />
            </Route>
            <Route exact path="/viewdiary/diary/:id">
              <DiaryDetail showToast={showToast} showType={showType} setProg={setProg} />
            </Route>
            <Route exact path="/account">
              <Account showToast={showToast} showType={showType} />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
