import React from 'react'
import attendy from '../ATTENDY.jpg'
import {useNavigate} from 'react-router-dom'

const Header = (props) => {

  let user = JSON.parse(localStorage.getItem("user") || "[]");
  const firstlett = user.username[0];
  const fullname = user.username.toUpperCase();
  const capitalalphaname = firstlett.toUpperCase();
  
  const menuToggle = () => {
    const togglemenu = document.querySelector('.menu');
    togglemenu.classList.toggle('active')
  }

  let navigate = useNavigate();

  const logOut = () => {
    if (window.confirm("are u sure u want to log out of your account")) {
      props.setLoggedIn(false);
      props.setUserInfo({});
      localStorage.removeItem("user");
      setTimeout(() => {
        navigate('/SignIn');
      }, 100)
    }
  }

  return (
    <div>
      <nav className="profile">
        <div><img src={attendy} alt="" className='attendy'/></div>
        <div className="profilenav">
          <div className="pname">Welcome, {fullname}</div>
          <div className='profilepic' onClick={menuToggle}>{capitalalphaname}</div>
          <div className="menu">
            <div className="picpic">{capitalalphaname}</div>
            <div className="ppname">{fullname}</div>
            <hr className='profhr'/>
            <div className='procontent'><b>Email:</b> {user.email}<br /><b>User ID:</b> {user._id}</div>
            <button className='btn btnout' onClick={logOut}>Sign-Out</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header