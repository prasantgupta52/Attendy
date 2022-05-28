import React, { useState } from 'react'
import axios from 'axios'
import HeaderPage from './HeaderPage'
import signupic from '../images/Signin.png'
import { useNavigate } from 'react-router-dom'
const urlserver = "https://attendy-student.herokuapp.com"

const SignIn = (props) => {

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {

    if (localStorage.getItem("user") === null) {
    } else {
      let user = JSON.parse(localStorage.getItem("user") || "[]");
      props.setLoggedIn(true);
      props.setUserInfo(user);
      navigate(`/Attendy/Home/${user.email}`)
    }
  }, [navigate])

  const logIn = async (e) => {

    e.preventDefault();
    await axios.get(`${urlserver}/fetchaccount/${username}`)
      .then(async (response) => {
        try {
          const tempemail = response.data[0];
          console.log("dt" + tempemail);
          if (tempemail.email === username) {
            if (tempemail.password === password) {
              localStorage.setItem("user", JSON.stringify(tempemail));
              props.setLoggedIn(true);
              props.setUserInfo(tempemail);
              console.log(props.userInfo);
              setUsername("");
              setPassword("");
              navigate(`/Attendy/Home/${tempemail.email}`)
            } else {
              alert("The password you entered is wrong please Enter correct password..!");
            }
          }
        } catch (err) {
          alert("Your account does not Exists please check Email or else Sign-Up")
        }
      })
  }

  return (
    <>
      <HeaderPage loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} userInfo={props.userInfo} setUserInfo={props.setUserInfo} />
      <div className="Signin">
        <div className='full container'>
          <h1>
            Sign-In
          </h1>
          <br />
          <form onSubmit={logIn}>
            <div className="form-group">
              <label for="exampleInputEmail1">
                <h4>Email address</h4>
              </label>
              <input type="email" value={username} onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <br />
            <div className="form-group">
              <label for="exampleInputPassword1">
                <h4>Password</h4>
              </label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <br />
            <button type="submit" className="btn btn-lg btnhigh btnlogin" >Submit</button>
          </form>
        </div>
        <div className="photo"><img src={signupic} className="signupic" /></div>
      </div>
    </>
  )
}

export default SignIn