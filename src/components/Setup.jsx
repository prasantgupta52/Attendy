import React from 'react'
import one from '../images/1.png'
import two from '../images/2.png'
// import three from '../images/3.png'
import four from '../images/4.png'
import five from '../images/5.png'

const Setup = () => {
  return (
    <div>
      <div className="marr container">
        <h1 className='refresh header-left-mar'>Setup / Instruction</h1>
        <div className='block container'>
          <h6>
          <p>1) First make sure your device has the <a href="https://www.python.org/downloads/" target="_blank">python 3.10</a> if not Download and install As the Program is not Compatible with lower version of python</p>
          <p>2) Download the Background Directory From <a href="https://github.com/prasantgupta52/Attendy-Background" target="_blank">Github</a> Or <a href="https://drive.google.com/drive/folders/1mM41dwB-6cSmdGtNPo22yY9qO00wE_fI?usp=sharing" target="_blank">Drive</a></p>
          <p>3) After Downloading the Folder unzip the folder and Navigate to the unzipped folder</p>
          <p>4) Inside the folder Hold ⇧ Shift and right-click any blank space in the folder. This displays a context menu next to your mouse cursor. As Shown Below in Picture</p>
          <img src={one} alt="" />
          <p><br/>5) Click Open PowerShell window here. This opens the PowerShell inside the folder.</p>
          <p>6) Now type "pip install -r requirements.txt" and hit enter this will take few minutes to complete</p>
          <img src={two} alt="" />
          <p><br/>7) After completion type "python app.py" and hit enter wait few second.</p>
          {/* <img src={three} alt="" /> */}
          <img src={four} alt="" />
          <p><br/>8) It will ask for your email which you used to SIgn-Up / Sign-In to Attendy email is case sensitive so type carefully now hit enter and wait few seconds</p>
          <p>9) If it shows running on http://127.0.0.1:5000 you are done and your application is running now do not close the powershell window or do not press Ctrl + C as it will <br /> stop the application</p>
          <img src={five} alt="" />
          <p><br/>10) Now you can use Attendy Seamlessly</p>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Setup  