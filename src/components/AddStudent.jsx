import React, { useState } from 'react'
import axios from 'axios'
const urlserver = "https://attendy.vercel.app"

const AddStudent = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [roll, setRoll] = useState("");
  const [classs, setClasss] = useState("");
  const [section, setSection] = useState("");
  const [firstname2, setFirstname2] = useState("");
  const [lastname2, setLastname2] = useState("");
  const [roll2, setRoll2] = useState("");
  const [classs2, setClasss2] = useState("");
  const [section2, setSection2] = useState("");

  const Add = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !classs || !roll || !section) {
      alert("First Name , Last Name , Class , Section or Roll cannot be Empty..!");
    } else {
      let user = JSON.parse(localStorage.getItem("user") || "[]");
      await axios.post(`${urlserver}/addstudent/${user._id}`, {
        firstname: firstname,
        lastname: lastname,
        roll: roll,
        classs: classs,
        section: section
      })
      // .then(props.refresh)
      setFirstname("");
      setLastname("");
      setClasss("");
      setRoll("");
      setSection("");
    }
  }
  const Remove = async (e) => {
    e.preventDefault();
    if (!firstname2 || !lastname2 || !classs2 || !roll2 || !section2) {
      alert("First Name , Last Name , Class , Section or Roll cannot be Empty..!");
    } else {
      let user = JSON.parse(localStorage.getItem("user") || "[]");
      if (window.confirm(`This Student will get deleted \r\n\r\nFirst Name: ${firstname2}\r\nLast Name: ${lastname2}\r\nClass: ${classs2}\r\nSection: ${section2}\r\nRoll: ${roll2}`)) {

        await axios.delete(`${urlserver}/removestudent/${user._id}/${firstname2}/${lastname2}/${classs2}/${roll2}/${section2}`);
        // props.refresh();
        setFirstname2("");
        setLastname2("");
        setClasss2("");
        setRoll2("");
        setSection2("");
      }
    }
  }

  return (
    <>
      <div className="marr container" >
        <h1 className='refresh header-left-mar'>Admin Section</h1>
        <div className="block container">
          <div className="add">
            <h4>Add Student</h4>
            <form onSubmit={Add}>
              <div className="row g-3">
                <div className="col">
                  <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} className="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div className="col">
                  <input type="text" value={lastname} onChange={(e) => { setLastname(e.target.value) }} className="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              <div className="row g-3">
                <div className="col">
                  <input type="text" value={classs} onChange={(e) => { setClasss(e.target.value) }} className="form-control" placeholder="Class" aria-label="Class" />
                </div>
                <div className="col">
                  <input type="text" value={section} onChange={(e) => { setSection(e.target.value) }} className="form-control" placeholder="Section" aria-label="Section" />
                </div>
                <div className="col">
                  <input type="text" value={roll} onChange={(e) => { setRoll(e.target.value) }} className="form-control" placeholder="Roll" aria-label="Roll" />
                </div>
              </div>
              <div className="row g-3">
                <button type="submit" className="btn btn-sm btnhigh" >Add Student</button>
              </div>
            </form>
          </div>
          <hr />
          <br />
          <div className="remove">
            <h4>Remove Student</h4>
            <form onSubmit={Remove}>
              <div className="row g-3">
                <div className="col">
                  <input type="text" value={firstname2} onChange={(e) => { setFirstname2(e.target.value) }} className="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div className="col">
                  <input type="text" value={lastname2} onChange={(e) => { setLastname2(e.target.value) }} className="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              <div className="row g-3">
                <div className="col">
                  <input type="text" value={classs2} onChange={(e) => { setClasss2(e.target.value) }} className="form-control" placeholder="Class" aria-label="Class" />
                </div>
                <div className="col">
                  <input type="text" value={section2} onChange={(e) => { setSection2(e.target.value) }} className="form-control" placeholder="Section" aria-label="Section" />
                </div>
                <div className="col">
                  <input type="text" value={roll2} onChange={(e) => { setRoll2(e.target.value) }} className="form-control" placeholder="Roll" aria-label="Roll" />
                </div>
              </div>
              <div className="row g-3">
                <button type="submit" className="btn btn-sm btnhigh" >Remove Student</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddStudent