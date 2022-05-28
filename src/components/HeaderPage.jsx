import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import attendy from '../ATTENDY.jpg'


const HeaderPage = () => {

  return (
    <div className='headerpage'>
      <nav className="profile">
        <div><img src={attendy} alt="" className='attendy' /></div>
        <div className="profilenav">
          <div className="pname" ><Link to='/Attendy/SignIn'><button className='btn btnlog'>Sign-In</button></Link></div>
          <div className="pname" ><Link to='/Attendy'><button className='btn btnlog'>Sign-Up</button></Link></div>
        </div>
      </nav>
    </div>
  )
}

export default HeaderPage