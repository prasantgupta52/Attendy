import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route exact path="/SignIn" element={<SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route exact path="/Home/:email" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
        </Routes>
      </Router>    
    </>
  );
}

export default App;
