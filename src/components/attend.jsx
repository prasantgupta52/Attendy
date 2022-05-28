import React from 'react'

const Students = (props) => {

  return (
    <div>
      <div className="col">
        <div className="card">
          {/* <img src={props.t} className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">Name : {props.student.FirstName} {props.student.LastName}</h5>
            <p className="card-text">Class : {props.student.Class}<br /> Section : {props.student.Section}<br />Roll : {props.student.Roll}<br />Entry Time : {props.student.Time}<br />Date : {props.student.Date}<br /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students