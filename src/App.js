import './App.css';
import StudentsList from './components/StudentsList'
import TodaysAttendance from './components/TodaysAttendance.jsx'
import SearchBar from './components/SearchBar.jsx'

function App() {
  return (
    <div>
      <nav className="profile">
        <div className='name'>hello name</div>
        <div className='profilepic'> pic</div>
      </nav>
      <div class="d-flex align-items-start">
        <div class="nav flex-column nav-pills mk bg-new1" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Student List</button>
          <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
          <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
          <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
        </div>
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><StudentsList /></div>
          <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><TodaysAttendance /></div>
          <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><SearchBar /></div>
          <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
        </div>
      </div>
    </div>    
  );
}

export default App;
