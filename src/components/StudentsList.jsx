import axios from 'axios';
import React, { useState } from 'react'
import '../App.css'
import Students from './Students.jsx'
import emptyList from '../images/EmptyList.png'
const urlserver = "https://attendy-student.herokuapp.com"


const StudentsList = () => {
  
  const [load, setLoad] = useState(false);
  const [studentslineup, setStudentslineup] = useState([]);

  const refresh = async () => {
    let user = JSON.parse(localStorage.getItem("user") || "[]");
    await axios.get(`${urlserver}/get_student_list/${user._id}`)
    .then((response) => {
      const data = response.data;
      setStudentslineup(data);
    })
  }
  
  React.useEffect(() => {
    refresh()
  }, [load])

  const refreshy = () => {
    if (load === true) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }
  
  return (
    <div className="marr container">
      <h1 className='refresh header-left-mar'>
      <div>Students List</div>
      <button className="btn refreshbtn btnhigh" onClick={refreshy} >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
          <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
          <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
        </svg>
        &nbsp;&nbsp;Refresh
      </button>
      <h6 className='result'>{studentslineup.length} Students Data Found</h6>
      </h1>
      <div className='block container'>
        <div class="row row-cols-1 row-cols-md-3 g-4">
        {studentslineup.length === 0 ? (
          <div className='cen'><div className='nostud'><h4>" No Students Data To Display Please Add Students from admin section Or Refresh <br />Or Refer To the Setup/Instruction Section on the Dashboard "</h4></div>
          <img src={emptyList} alt="empty" className='empty' /></div>
        ) :
          studentslineup.map((student) => {
            return (<Students student={student}/>)
          })
        }
        </div>
      </div>
    </div>
  )
}

export default StudentsList