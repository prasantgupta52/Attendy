import './App.css';
import React, { useState } from 'react';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Footer  from './components/Footer'
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
          <Route exact path="Attendy/" element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route exact path="Attendy/SignIn" element={<SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
          <Route exact path="Attendy/Home/:email" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} userInfo={userInfo} setUserInfo={setUserInfo} />} />
        </Routes>
      </Router>    
      <Footer />
    </>
  );
}

export default App;
