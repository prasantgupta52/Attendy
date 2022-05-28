import React from 'react'
import attendy from '../ATTENDY.jpg'
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {

  let user = JSON.parse(localStorage.getItem("user") || "[]");
  const firstlett = user.username[0];
  const fullname = user.username.toUpperCase();
  const capitalalphaname = firstlett.toUpperCase();

  const menuToggle = () => {
    const togglemenu = document.querySelector('.menu');
    togglemenu.classList.toggle('active')
  }
  
  const logOut = () => {
    if (window.confirm("Are you sure you want to Sign-out of your Account")) {
      props.setLoggedIn(false);
      props.setUserInfo({});
      localStorage.removeItem("user");
    }
  }

  return (
    <div>
      <nav className="profile">
        <div><img src={attendy} alt="" className='attendy' /></div>
        <div className="profilenav">
          <div className="pname" onClick={menuToggle}>Welcome, {fullname}</div>
          <div className='profilepic' onClick={menuToggle}>{capitalalphaname}</div>
        </div>
        <div className="menu">
          <div className="picpic">{capitalalphaname}</div>
          <div className="ppname">{fullname}</div>
          <hr className='profhr' />
          <div className='procontent'><b>Email:</b> {user.email}<br /><b>User ID:</b> {user._id}</div>
          <br />
          <Link to='/Attendy/SignIn'><button className='btn btnout' onClick={logOut}><b>Sign-Out</b></button></Link>
        </div>
      </nav>
    </div>
  )
}

export default Header