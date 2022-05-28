import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Attend from './attend'
import SearchEmpty from '../images/SearchEmpty.png'
const urlserver = "https://attendy-student.herokuapp.com"


const SearchBar = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [roll, setRoll] = useState("");
  const [classs,  setClasss] = useState("");
  const [section,  setSection] = useState("")
  const [date,  setDate] = useState("");

  const [load, setLoad] = useState(false);
  const [studentslineup, setStudentslineup] = useState([]);

  const refresh = async () => {
    let user = JSON.parse(localStorage.getItem("user") || "[]");

    if (!firstname&&!lastname&&!roll&&!section&&!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance/${user._id}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!roll&&!section&&!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname/${user._id}/${firstname}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!roll&&!section&&!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_lastname/${user._id}/${lastname}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!section&&!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_roll/${user._id}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!section&&!roll&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_class/${user._id}/${classs}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!roll&&!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_section/${user._id}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!section&&!classs&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_date/${user._id}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!section&&!classs&&!roll&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname/${user._id}/${firstname}/${lastname}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!classs&&!roll&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_section/${user._id}/${firstname}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!section&&!roll&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_class/${user._id}/${firstname}/${classs}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!section&&!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_roll/${user._id}/${firstname}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!lastname&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_date/${user._id}/${firstname}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs/${user._id}/${lastname}/${classs}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!firstname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_section/${user._id}/${lastname}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!firstname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_roll/${user._id}/${lastname}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_date/${user._id}/${lastname}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname&&!lastname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_classs_section/${user._id}/${classs}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname&&!lastname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_classs_roll/${user._id}/${classs}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_classs_date/${user._id}/${classs}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!firstname&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_section_roll/${user._id}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname&&!lastname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_section_date/${user._id}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname&&!lastname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_roll_date/${user._id}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs/${user._id}/${firstname}/${lastname}/${classs}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_section/${user._id}/${firstname}/${lastname}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!lastname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_section/${user._id}/${firstname}/${classs}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_section/${user._id}/${lastname}/${classs}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_roll/${user._id}/${firstname}/${lastname}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!lastname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_roll/${user._id}/${firstname}/${classs}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_roll/${user._id}/${lastname}/${classs}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_section_roll/${user._id}/${firstname}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date&&!firstname) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_section_roll/${user._id}/${lastname}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_classs_section_roll/${user._id}/${classs}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_date/${user._id}/${firstname}/${lastname}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_date/${user._id}/${firstname}/${classs}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_date/${user._id}/${lastname}/${classs}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!lastname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_section_date/${user._id}/${firstname}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_section_date/${user._id}/${lastname}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_classs_section_date/${user._id}/${classs}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!lastname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_roll_date/${user._id}/${firstname}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_roll_date/${user._id}/${lastname}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_classs_roll_date/${user._id}/${classs}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_section_roll_date/${user._id}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_section/${user._id}/${firstname}/${lastname}/${classs}/${section}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_roll/${user._id}/${firstname}/${lastname}/${classs}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_section_roll/${user._id}/${firstname}/${lastname}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_section_roll/${user._id}/${firstname}/${classs}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date&&!firstname) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_section_roll/${user._id}/${lastname}/${classs}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!roll&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_date/${user._id}/${firstname}/${lastname}/${classs}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_section_date/${user._id}/${firstname}/${lastname}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_section_date/${user._id}/${firstname}/${classs}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!roll) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_section_date/${user._id}/${lastname}/${classs}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_roll_date/${user._id}/${firstname}/${lastname}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_roll_date/${user._id}/${firstname}/${classs}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!section) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_roll_date/${user._id}/${lastname}/${classs}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_section_roll_date/${user._id}/${firstname}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs&&!firstname) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_section_roll_date/${user._id}/${lastname}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname&&!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_classs_section_roll_date/${user._id}/${classs}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!date) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_section_roll/${user._id}/${firstname}/${lastname}/${classs}/${section}/${roll}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!roll) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_section_date/${user._id}/${firstname}/${lastname}/${classs}/${section}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!section) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_roll_date/${user._id}/${firstname}/${lastname}/${classs}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!classs) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_section_roll_date/${user._id}/${firstname}/${lastname}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!lastname) {
      await axios.get(`${urlserver}/get_attendance_by_firstname_classs_section_roll_date/${user._id}/${firstname}/${classs}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else if (!firstname) {
      await axios.get(`${urlserver}/get_attendance_by_lastname_classs_section_roll_date/${user._id}/${lastname}/${classs}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    } else {
      await axios.get(`${urlserver}/get_attendance_by_firstname_lastname_classs_section_roll_date/${user._id}/${firstname}/${lastname}/${classs}/${section}/${roll}/${date}`)
      .then((response) => {
        const data = response.data;
        setStudentslineup(data);
      })
    }
    setFirstname("");
    setLastname("");
    setClasss("");
    setRoll("");
    setSection("");
    setDate("");
  }

  useEffect(() => {
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
      <h1 className='refreshre header-left-mar'><div>Search For Attendance</div><h6 className='result'>{studentslineup.length} Results Found</h6>  
      </h1>
        <div class="row g-3">
          <div class="col">
            <input type="text" value={firstname} onChange ={ (e) => {setFirstname(e.target.value)}} class="form-control" placeholder="First name" aria-label="First name" />
          </div>
          <div class="col">
            <input type="text" value={lastname} onChange ={ (e) => {setLastname(e.target.value)}} class="form-control" placeholder="Last name" aria-label="Last name" />
          </div>
          <div class="col">
            <input type="text" value={classs} onChange ={ (e) => {setClasss(e.target.value)}} class="form-control" placeholder="Class" aria-label="Class" />
          </div>
          <div class="col">
            <input type="text" value={section} onChange ={ (e) => {setSection(e.target.value)}} class="form-control" placeholder="Section" aria-label="Section" />
          </div>
          <div class="col">
            <input type="text" value={roll} onChange ={ (e) => {setRoll(e.target.value)}} class="form-control" placeholder="Roll" aria-label="Roll" />
          </div>
          <div class="col">
            <input type="text" value={date} onChange ={ (e) => {setDate(e.target.value)}} class="form-control" placeholder="DD-MM-YYYY" aria-label="Date" />
          </div>
        </div>
        <div class="row g-3">
          <button type="submit" className="btn btn-sm btnhigh" onClick={refreshy}>Search</button>
        </div>
      <div className='block3 container'>
        <div class="row row-cols-1 row-cols-md-3 g-4">
        {studentslineup.length === 0 ? (
          <div className='cen'><div className='nostud'><h4>" No Attendance Found "</h4></div>
          <img src={SearchEmpty} alt="empty" className='empty' /></div>
        ) :
          studentslineup.map((student) => {
            return (<Attend student={student}/>)
          })
        }
        </div>
      </div>
    </div>
  )
}

export default SearchBar