import React from 'react'
import SearchBar from './SearchBar';
import StudentsList from './StudentsList';
import TodaysAttendance from './TodaysAttendance';
import AddStudent from './AddStudent.jsx';
import Header from './Header';
import Setup from './Setup'

const Home = (props) => {

  return (

    <div>
      <Header loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} userInfo={props.userInfo} setUserInfo={props.setUserInfo} />
      <div className="d-flex align-items-start sidenav">
        <div className="nav flex-column nav-pills mk bg-new1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a href='http://127.0.0.1:5000' target='_blank'><button className='camfeed btnfeed'>Live Camera Feed</button></a>
          <button className="nav-link active" id="v-pills-studentList-tab" data-bs-toggle="pill" data-bs-target="#v-pills-studentList" type="button" role="tab" aria-controls="v-pills-studentList" aria-selected="true">Student List</button>
          <button className="nav-link" id="v-pills-TodaysAttendance-tab" data-bs-toggle="pill" data-bs-target="#v-pills-TodaysAttendance" type="button" role="tab" aria-controls="v-pills-TodaysAttendance" aria-selected="false">Today's Attendance</button>
          <button className="nav-link" id="v-pills-SearchBar-tab" data-bs-toggle="pill" data-bs-target="#v-pills-SearchBar" type="button" role="tab" aria-controls="v-pills-SearchBar" aria-selected="false">Search Bar</button>
          <button className="nav-link" id="v-pills-AdminSection-tab" data-bs-toggle="pill" data-bs-target="#v-pills-AdminSection" type="button" role="tab" aria-controls="v-pills-AdminSection" aria-selected="false">Admin Section</button>
          <button className="nav-link" id="v-pills-Instruction-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Instruction" type="button" role="tab" aria-controls="v-pills-Instruction" aria-selected="false">Setup/Instruction</button>
        </div>
        <div className="tab-content sidesection" id="v-pills-tabContent">
          <div className="tab-pane fade show active" id="v-pills-studentList" role="tabpanel" aria-labelledby="v-pills-studentList-tab"><StudentsList /></div>
          <div className="tab-pane fade" id="v-pills-TodaysAttendance" role="tabpanel" aria-labelledby="v-pills-TodaysAttendance-tab"><TodaysAttendance /></div>
          <div className="tab-pane fade" id="v-pills-SearchBar" role="tabpanel" aria-labelledby="v-pills-SearchBar-tab"><SearchBar /></div>
          <div className="tab-pane fade" id="v-pills-AdminSection" role="tabpanel" aria-labelledby="v-pills-AdminSection-tab"><AddStudent /></div>
          <div className="tab-pane fade" id="v-pills-Instruction" role="tabpanel" aria-labelledby="v-pills-Instruction-tab"><Setup /></div>
        </div>
      </div>
    </div>
  )
}

export default Home