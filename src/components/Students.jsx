import React from 'react'

const Students = (props) => {
  return (
    <div>
      <div class="col">
        <div class="card">
          <img src={props.t} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Name</h5>
            <p class="card-text">Class : <br /> Section : <br />Roll : <br /></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students