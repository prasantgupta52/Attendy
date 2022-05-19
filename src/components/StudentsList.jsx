import React, { useState } from 'react'
import '../App.css'
import Students from './Students.jsx'
// import c from '../../../../photos/train/chris.jpg'

const StudentsList = () => {
  // const fs = require('fs')

  const [Studentslineup, setStudentslineup] = useState({});
  const [isStudentListLoaded, setIsStudentListLoaded] = useState(false);

  const getStudentList = () => {
    fetch('http://127.0.0.1:5000/get_employee_list')
        .then(response => response.json())
        .then (response =>{
            if(!isStudentListLoaded){
                setStudentslineup(response)
                setIsStudentListLoaded(true)
            }
        })
  }
  getStudentList()
  // var dev = 'file:///C:/Users/PRASANT%20GUPTA/OneDrive/Desktop/photos/train/prasant.jpeg';
  return (
    <div className="marr container">
      <h1>Students List</h1>
      <div className='block container'>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
          <Students />
        </div>
      </div>
    </div>
  )
}

export default StudentsList