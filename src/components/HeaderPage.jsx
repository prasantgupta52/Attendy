import React from 'react'
import attendy from '../ATTENDY.jpg'


const HeaderPage = () => {
  return (
    <div className='headerpage'>
      <nav className="profile">
        <div><img src={attendy} alt="" className='attendy'/></div>
      </nav>
    </div>
  )
}

export default HeaderPage