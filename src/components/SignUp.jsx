import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import HeaderPage from './HeaderPage'
import url1 from '../url';
import signupic from '../images/Signup.png'

const SignUp = (props) => {

  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  React.useEffect(() => {
    if (localStorage.getItem("user") === null) {
    } else {
      let user = JSON.parse(localStorage.getItem("user") || "[]");
      props.setLoggedIn(true);
      props.setUserInfo(user);
      navigate(`/Home/${user.email}`)
    }
  }, [navigate])

  const createaccount = async () => {
    await axios.post(`http://localhost:3001/insertuser`, {
      username: name,
      email: username,
      password: password,
      cpassword: cpassword
    })
      .then(
        setTimeout(async () => {
          await axios.get(`http://localhost:3001/fetchaccount/${username}`)
            .then(async (response) => {
              // console.log(response);
              let userdetail = response.data[0];
              setTimeout(async () => {
                // await axios.post(`https://localhost:3001/user/${userdetail._id}`)
                console.log(userdetail);
                localStorage.setItem('user', JSON.stringify(userdetail));
                props.setLoggedIn(true);
                await props.setUserInfo(userdetail);
                console.log(props.userInfo);
                setName("");
                setUsername("");
                setPassword("");
                setCpassword("");
                navigate(`/Home/${userdetail.email}`)
              }, 1000)
            });
        }, 1000));
  }



  const create = async (e) => {
    e.preventDefault();
    if (!username || !password || !cpassword || !name) {
      alert("Please Ensure that every Field is filled none of em is Empty");
    } else {
      if (password === cpassword) {
        await axios.get(`http://localhost:3001/fetchaccount/${username}`)
          .then(async (response) => {
            try {
              const tempemail = response.data[0];
              if (tempemail.email === username) {
                alert("your account already Exists try Signing in to your Account")
                setName("");
                setUsername("");
                setPassword("");
                setCpassword("");
                navigate('/SignIn');
              }
            } catch (err) {
              await createaccount();
            }
          })
      } else {
        alert("password and confirm password does not matches please enter password carefully")
      }
    }
  }

  return (
    <>
    <HeaderPage loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} userInfo={props.userInfo} setUserInfo={props.setUserInfo} />
    <div className="Signup">
    <div className="photo"><img src={signupic} className="signupic"/></div>
    <div className="full container">
      <h1>
        Sign-Up
      </h1>
      <br />
      <form onSubmit={create}>
        <div class="mb-3">
          <label for="examplename" class="form-label"><h5>Name</h5></label>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Your Name Here" class="form-control" id="examplename" />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"><h5>Email address</h5></label>
          <input type="email" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Your Email Here" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"><h5>Password</h5></label>
          <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter your Password' class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label"><h5>Confirm Password</h5></label>
          <input type="password" value={cpassword} onChange={(e) => {setCpassword(e.target.value)}} placeholder='Confirm your Password' class="form-control" id="exampleInputPassword2" />
        </div>
        <br />
        <button type="submit" class="btn btn-lg btnhigh btnlogin">Submit</button>
      </form>
    </div>
    </div>
    </>
  )
}

export default SignUp