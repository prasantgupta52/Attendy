import React from 'react'
import one from '../images/1.png'
import two from '../images/2.png'
import three from '../images/3.png'
import four from '../images/4.png'
import five from '../images/5.png'

const Setup = () => {
  return (
    <div>
      <div className="marr container">
        <h1 className='refresh header-left-mar'><div>Setup / Instruction</div><h6 className='result'>Points 1 to 15</h6></h1>
        <div className='block container'>
          <h6>
            <p>1) First make sure your device has the <a href="https://www.python.org/downloads/" target="_blank">python 3.10</a> if not please Download and install As the Program is not Compatible with lower version of python</p>
            <p>2) Download the Background Directory From <a href="https://github.com/prasantgupta52/Attendy-Background" target="_blank">Github</a> Or <a href="https://drive.google.com/drive/folders/1mM41dwB-6cSmdGtNPo22yY9qO00wE_fI?usp=sharing" target="_blank">Drive</a></p>
            <p>3) After Downloading the Folder unzip the folder and Navigate to the unzipped folder</p>
            <p>4) Now You can Add And Remove Students From the Admin Section of the Application but Remember to Add photos of the student inside the "photo_of_students" folder of the file you downloaded while Adding a student and Deleting the photo while Removing the Student </p>
            <p>5) Also maintain the naming format of the file for exmaple if a student's name is <i>Chris Hemsworth</i> he is in class-12 section-A Roll-14 the name of the photo file you added should be in this format "Chris_Hemsworth_12_A_14.jpg" as Shown Below Also Everything is case Sensitive So maintain the Case of Filename same as you added in admin section. And Please Do not Delete this Sample Photo From the Folder </p>
            <img src={one} alt="" />
            <p><br />6) Inside the folder Hold ⇧ Shift and right-click any blank space in the folder. This displays a context menu next to your mouse cursor. As Shown Below in Picture</p>
            <img src={two} alt="" />
            <p><br />7) Click Open PowerShell window here. This opens the PowerShell inside the folder.</p>
            <p>8) Now type "pip install -r requirements.txt" and hit enter this will take few minutes to complete. This is a one time Setup So it takes Few minutes Please Wait..</p>
            <img src={three} alt="" />
            <p><br />9) After completion type "python app.py" and hit enter wait few second.</p>
            <img src={four} alt="" />
            <p><br />10) It will ask for your Email and Password which you used to Sign-Up / Sign-In to Attendy. Email & Password is case sensitive so type carefully now hit enter and wait few seconds</p>
            <p>11) If it shows running on http://127.0.0.1:5000 you are done and your application is running now do not close the powershell window or do not press Ctrl + C as it will stop the application</p>
            <img src={five} alt="" />
            <p><br />12) Now you can use Attendy Seamlessly</p>
            <h3>Other Instruction</h3>
            <p>13) If the "photo_of_students" folder is updated by Admin Please Close the program running in powerShell by pressing Ctrl + C and Re Run The Program using "python app.py" command</p>
            <p>14) All Passwords, Name, Roll, Class, Section e.t.c are Case Sensitive So Please Maintain Case</p>
            <p>15) In the Search Bar while Searching using Date make Sure Date format is In DD-MM-YYYY also For Roll It Should Be a number</p>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Setup  