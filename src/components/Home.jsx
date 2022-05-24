import React from 'react'
import SearchBar from './SearchBar';
import StudentsList from './StudentsList';
import TodaysAttendance from './TodaysAttendance';
import AddStudent from './AddStudent.jsx';
import attendy from '../ATTENDY.jpg'

const Home = () => {

  let user = JSON.parse(localStorage.getItem("user") || "[]");
  const firstlett = user.username[0];
  const fullname = user.username.toUpperCase();
  const capitalalphaname = firstlett.toUpperCase();

  return (
    <div>
      <nav className="profile">
        <div className='name webname'><img src={attendy} alt="" className='attendy'/></div>
        <div className="profilenav"><div className="pname">Welcome, {fullname}</div><div className='profilepic'>{capitalalphaname}</div></div>
      </nav>
      <div class="d-flex align-items-start sidenav">
        <div class="nav flex-column nav-pills mk bg-new1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Student List</button>
          <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Today's Attendance</button>
          <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Search Bar</button>
          <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Admin Section</button>
        </div>
        <div class="tab-content sidesection" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><StudentsList /></div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><TodaysAttendance /></div>
          <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><SearchBar /></div>
          <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"><AddStudent /></div>
        </div>
      </div>
    </div>
  )
}

export default Home