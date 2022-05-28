import React from 'react'

const Students = (props) => {

  return (
    <div>
      <div className="col">
        <div className="card">
          {/* <img src={props.t} className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title"><i>{props.student.FirstName} {props.student.LastName}</i></h5>
            <p className="card-text"><b>Class : </b>{props.student.Class}<br /><b> Section : </b>{props.student.Section}<br /><b>Roll : </b>{props.student.Roll}<br /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students