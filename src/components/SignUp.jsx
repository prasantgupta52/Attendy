import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import url1 from '../url';

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
    {/* <nav class="navbar navbar-expand-lg sty">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Pricing</a>
            <a class="nav-link disabled">Disabled</a>
          </div>
        </div>
      </div>
    </nav> */}
    <div className="full container">
      <h1>
        SignUp
      </h1>
      <br />
      <form onSubmit={create}>
        <div class="mb-3">
          <label for="examplename" class="form-label">Name</label>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Your Name Here" class="form-control" id="examplename" />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Your Email Here" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Enter your Password' class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
          <input type="password" value={cpassword} onChange={(e) => {setCpassword(e.target.value)}} placeholder='Confirm your Password' class="form-control" id="exampleInputPassword2" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  )
}

export default SignUp