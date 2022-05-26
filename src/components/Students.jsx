import React from 'react'

const Students = (props) => {

  return (
    <div>
      <div class="col">
        <div class="card">
          {/* <img src={props.t} class="card-img-top" alt="..." /> */}
          <div class="card-body">
            <h5 class="card-title"><i>{props.student.FirstName} {props.student.LastName}</i></h5>
            <p class="card-text"><b>Class : </b>{props.student.Class}<br /><b> Section : </b>{props.student.Section}<br /><b>Roll : </b>{props.student.Roll}<br /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students