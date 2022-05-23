import React from 'react'

const Students = (props) => {

  return (
    <div>
      <div class="col">
        <div class="card">
          {/* <img src={props.t} class="card-img-top" alt="..." /> */}
          <div class="card-body">
            <h5 class="card-title">Name : {props.student.FirstName} {props.student.LastName}</h5>
            <p class="card-text">Class : {props.student.Class}<br /> Section : {props.student.Section}<br />Roll : {props.student.Roll}<br />Entry Time : {props.student.Time}<br />Date : {props.student.Date}<br /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students