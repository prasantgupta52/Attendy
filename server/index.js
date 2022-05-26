const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();
const userModel = require('./models/userdata')
const studentdata = require('./models/students')
const attendancedata = require('./models/attendance')

const app = express();

app.use(express.json());
app.use(cors());

// connecting to cluster in mogodb atlas inserting password and database name
mongoose.connect("mongodb+srv://prasantgupta52:3zrBVob5gKjiXSPB@cluster0.6pyzz.mongodb.net/Attendy?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})

app.post('/insertuser', async (req, res) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  const user = new userModel({
    username: username,
    email: email,
    password: password,
    cpassword: cpassword
  });
  try {
    await user.save();
    res.send("inserted data into database ")
  } catch (err) {
    console.log("error found error details: " + err);
  }
})


app.get('/fetchaccount/:email', async (req, res) => {

  const getemail = req.params.email;

  try {
    await userModel.find({ email: getemail }, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("error in usermodel.find" + err);
  }
})


app.post('/addstudent/:userid', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const roll = req.body.roll;
  const classs = req.body.classs;
  const section = req.body.section;

  var userSchema = studentdata(`data${userid}`);
  const user = new userSchema({
    FirstName: firstname,
    LastName: lastname,
    Roll: roll,
    Class: classs,
    Section: section
  });
  try {
    await user.save();
    res.send("inserted data into database ")
    // console.log("inserted succesfullly in new user todo ");
  } catch (err) {
    console.log("error found error details: " + err);
  }
})

app.delete('/removestudent/:userid/:firstname/:lastname/:classs/:roll/:section', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const roll = req.params.roll;
  const section = req.params.section;
  
  var userSchema = studentdata(`data${userid}`);
  try {
    await userSchema.deleteOne({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Roll: roll,
      Section: section
    }, (error, data) => {
      if (error) {
        console.log('error in deleting!');
        throw error;
      } else {
        // console.log('todo has been deleted', data);
        res.status(204).json(data);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.post('/attendance/:userid', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const roll = req.body.roll;
  const classs = req.body.classs;
  const section = req.body.section;
  const time = req.body.time;
  const date = req.body.date;

  var userSchema = attendancedata(`attend${userid}`);
  const user = new userSchema({
    FirstName: firstname,
    LastName: lastname,
    Roll: roll,
    Class: classs,
    Section: section,
    Time: time,
    Date: date,
  });
  try {
    await user.save();
    res.send("inserted data into database ")
    // console.log("inserted succesfullly in new user todo ");
  } catch (err) {
    console.log("error found error details: " + err);
  }
})

app.get('/today_attendance/:userid', async (req, res) => {

  const userid = req.params.userid;
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = d.getMonth()+1;
  let mmm;
  if(mm<10){
    mmm='0'+mm;
  } else{
    mmm=mm;
  }
  const dd = d.getDate();
  let ddd;
  if(dd<10){
    ddd='0'+dd;
  } else{
    ddd=dd;
  }
  const date = `${ddd}-${mmm}-${yyyy}`;
  
  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/findstudent/:userid', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const classs = req.body.classs;
  const section = req.body.section;
  const roll = req.body.roll;
  const date = req.body.date;
  
  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Roll: roll,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_student_list/:userid', async (req, res) => {

  const userid = req.params.userid;
  var userSchema = studentdata(`data${userid}`);
  try {
    await userSchema.find({}, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("error in usermodel.find" + err);
  }
})

app.get('/attendance_by_date/:userid', async (req, res) => {

  const userid = req.params.userid;
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = d.getMonth()+1;
  let mmm;
  if(mm<10){
    mmm='0'+mm;
  } else{
    mmm=mm;
  }
  const dd = d.getDate();
  let ddd;
  if(dd<10){
    ddd='0'+dd;
  } else{
    ddd=dd;
  }
  const date = `${ddd}-${mmm}-${yyyy}`;
  
  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance/:userid', async (req, res) => {

  const userid = req.params.userid;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({}, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname/:userid/:firstname', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      FirstName: firstname
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname/:userid/:lastname', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      LastName: lastname
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_class/:userid/:classs', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      Class: classs
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_roll/:userid/:roll', async (req, res) => {

  const userid = req.params.userid;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_section/:userid/:section', async (req, res) => {

  const userid = req.params.userid;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_date/:userid/:date', async (req, res) => {

  const userid = req.params.userid;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname/:userid/:firstname/:lastname', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_section/:userid/:firstname/:section', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      FirstName: firstname,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_class/:userid/:firstname/:classs', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_roll/:userid/:firstname/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);
  try {
    await userSchema.find({
      FirstName: firstname,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_date/:userid/:firstname/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs/:userid/:lastname/:classs', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_section/:userid/:lastname/:section', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_roll/:userid/:lastname/:roll', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_date/:userid/:lastname/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_section/:userid/:classs/:section', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_roll/:userid/:classs/:roll', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_date/:userid/:classs/:date', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_section_roll/:userid/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_section_date/:userid/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_roll_date/:userid/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs/:userid/:firstname/:lastname/:classs', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_section/:userid/:firstname/:lastname/:section', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_section/:userid/:firstname/:classs/:section', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_section/:userid/:lastname/:classs/:section', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_roll/:userid/:firstname/:lastname/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_roll/:userid/:firstname/:classs/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_roll/:userid/:lastname/:classs/:roll', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_section_roll/:userid/:firstname/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_section_roll/:userid/:lastname/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_section_roll/:userid/:classs/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_date/:userid/:firstname/:lastname/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_date/:userid/:firstname/:classs/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_date/:userid/:lastname/:classs/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_section_date/:userid/:firstname/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_section_date/:userid/:lastname/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_section_date/:userid/:classs/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_roll_date/:userid/:firstname/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_roll_date/:userid/:lastname/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_roll_date/:userid/:classs/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_section_roll_date/:userid/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_section/:userid/:firstname/:lastname/:classs/:section', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Section: section
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_roll/:userid/:firstname/:lastname/:classs/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_section_roll/:userid/:firstname/:lastname/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_section_roll/:userid/:firstname/:classs/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_section_roll/:userid/:lastname/:classs/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_date/:userid/:firstname/:lastname/:classs/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_section_date/:userid/:firstname/:lastname/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_section_date/:userid/:firstname/:classs/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_section_date/:userid/:lastname/:classs/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_roll_date/:userid/:firstname/:lastname/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_roll_date/:userid/:firstname/:classs/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_roll_date/:userid/:lastname/:classs/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_section_roll_date/:userid/:firstname/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_section_roll_date/:userid/:lastname/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_classs_section_roll_date/:userid/:classs/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      Class: classs,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_section_roll/:userid/:firstname/:lastname/:classs/:section/:roll', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Section: section,
      Roll: roll
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_section_date/:userid/:firstname/:lastname/:classs/:section/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Section: section,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_roll_date/:userid/:firstname/:lastname/:classs/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_section_roll_date/:userid/:firstname/:lastname/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_classs_section_roll_date/:userid/:firstname/:classs/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      Class: classs,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_lastname_classs_section_roll_date/:userid/:lastname/:classs/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      LastName: lastname,
      Class: classs,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.get('/get_attendance_by_firstname_lastname_classs_section_roll_date/:userid/:firstname/:lastname/:classs/:section/:roll/:date', async (req, res) => {

  const userid = req.params.userid;
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const classs = req.params.classs;
  const section = req.params.section;
  const roll = req.params.roll;
  const date = req.params.date;

  var userSchema = attendancedata(`attend${userid}`);

  try {
    await userSchema.find({
      FirstName: firstname,
      LastName: lastname,
      Class: classs,
      Section: section,
      Roll: roll,
      Date: date
    }, (error, result) => {
      if (error) {
        res.send(error)
      } else {
        res.send(result);
      }
    }).clone();
  } catch (err) {
    console.log("prblm in dlt " + err);
  }
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port http://localhost:3001 ..!`);
})