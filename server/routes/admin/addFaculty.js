var express = require("express");
var router = express.Router();
var mongo = require("../../connection");
var md5 = require('md5');
var multer = require('multer');
var validator = require("email-validator");
const csv = require('csv-parser');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

var upload = multer({ storage: storage });

router.post("/", async function (req, res) {
  const db1 = mongo.get().collection("user");
  var facultyDetails = {
    _id: req.body.USER_ID,
    FIRST_NAME: req.body.FIRST_NAME,
    LAST_NAME: req.body.LAST_NAME,
    DEPARTMENT: req.body.DEPARTMENT,
    COLLEGE: req.body.COLLEGE,
    ROLE: req.body.ROLE,
    MOBILE: req.body.MOBILE,
    MAIL_ID: req.body.MAIL_ID,
    PASSWORD: md5(req.body.PASSWORD)
  };
  db1.insertOne(facultyDetails, function (err, result) {
    if (err) res.send('err');
    else res.send('Success');

  });
  // var result = {
  //   status: ""
  // };
  // var ar = await db1.find({ _id: req.body.USER_ID }).toArray();
  // console.log(ar);
  // if (ar.length > 0) {
  //   result.status = 2;
  //   console.log(result);
  //   res.send(result);
  // } else {
  //   result.status = 1;
  //   db1.insertOne(facultyDetails);
  //   console.log(status);
  //   res.send(result.status);
  // }

  // var facultyDetails = {
  //   _id: req.body.USER_ID,
  //   FIRST_NAME: req.body.FIRST_NAME,
  //   LAST_NAME: req.body.LAST_NAME,
  //   DEPARTMENT: req.body.DEPARTMENT,
  //   COLLEGE: req.body.COLLEGE,
  //   ROLE: req.body.ROLE,
  //   MOBILE: req.body.MOBILE,
  //   MAIL_ID: req.body.MAIL_ID,
  //   PASSWORD: req.body.PASSWORD
  // };

  //     db1.insertOne(facultyDetails);

  //  const exit = await db1.find({_id: facultyDetails._id});
  //  console.log(exit);
});

router.post('/csv', upload.single('file'), async function (req, res) {
  const db = mongo.get().collection("user");
  var array = [];
  var details = [];  
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      console.log(row);
      array.push(row);
    })
    .on('end', async() => {
      var sucessTotal=0;
      var updateResult= [];
      for (var i = 0; i < array.length; i++) {
        // array[i].PASSWORD = md5(array[i].PASSWORD);
        // db.insert(array[i]);
        array[i].DEPARTMENT="Electronics & Communication Engineering";
        array[i].COLLEGE ="K Ramakrishnan College of Engineering";
        array[i].ROLE ="F";
        if (
          !array[i]._id ||
          !array[i].FIRST_NAME ||
          !array[i].LAST_NAME ||
          !array[i].DEPARTMENT ||
          !array[i].COLLEGE ||
          !array[i].ROLE ||
          !array[i].MOBILE ||
          !array[i].MAIL_ID ||
          !array[i].PASSWORD
        )
        {
          updateResult.push({
            status:0,
            query:"Some Details Are Missing - Row: "+(i+1)
          })
        }
        else if (array[i].MOBILE.length !== 10 || isNaN(array[i].MOBILE)) {
            updateResult.push({
              status:0,
              query:"Invalid Mobile Number - Row: "+(i+1)
            })
        }
        else if(!validator.validate(array[i].MAIL_ID))
        {
          updateResult.push({
            status:0,
            query:"Invalid Email - Row: "+(i+1)
          })
        }        
        else 
        {
          array[i].PASSWORD=md5(array[i].PASSWORD)
          await db.insertOne(
            array[i]           
          ). then(res=>{
            sucessTotal++;
            updateResult.push({
              status:1,
              query:"Updated Sucess - Row: "+(i+1)
            })
          })
          .catch(err=>{
            updateResult.push({
              status:0,
              query:"Faculty Id Already Exist - Row: "+(i+1)
            })
          })
        }
      }
      res.send({updateResult,sucessTotal});   
     })
})

router.get("/getFacultyDetails", async function (req, res) {
  //console.log(req.body);
  const db1 = mongo.get().collection("user");

  db1.find({}).toArray(function (err, result) {
    if (err) console.log(err);
    else res.send(result);
  });
});

router.post("/getIndividualFacultyDetails", async function (req, res) {
  const db1 = mongo.get().collection("user");
  console.log("working");
  console.log(req.body.faculty_id)
  db1.find({ "_id": req.body.faculty_id }).toArray((err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.send(result);
    }
  });
});

router.post("/UpdateFaculty", async function (req, res) {
  const db1 = mongo.get().collection("user");
  // var facultyDetails = {
  //   _id: req.body.USER_ID,
  //   FIRST_NAME: req.body.FIRST_NAME,
  //   LAST_NAME: req.body.LAST_NAME,
  //   DEPARTMENT: req.body.DEPARTMENT,
  //   COLLEGE: req.body.COLLEGE,
  //   ROLE: req.body.ROLE,
  //   MOBILE: req.body.MOBILE,
  //   MAIL_ID: req.body.MAIL_ID,
  //   PASSWORD: md5(req.body.PASSWORD)
  // };
  console.log(req.body);
  var password = "";
  if (req.body.CHANGED_PASSWORD != "") {
    password = md5(req.body.CHANGED_PASSWORD)
  }
  else {
    password = req.body.PASSWORD
  }
  db1.update(
    {
      _id: req.body.USER_ID
    },
    {
      $set: {
        FIRST_NAME: req.body.FIRST_NAME,
        LAST_NAME: req.body.LAST_NAME,
        DEPARTMENT: req.body.DEPARTMENT,
        COLLEGE: req.body.COLLEGE,
        ROLE: req.body.ROLE,
        MOBILE: req.body.MOBILE,
        MAIL_ID: req.body.MAIL_ID,
        PASSWORD: password
      }
    }, function (err, result) {
      if (err) res.send('err');
      else res.send('Success');

    }
  )

});

router.post('/deleteFaculty',(req,res)=>{
  console.log(req.body);
  const db = mongo.get().collection("user");
  db.remove({_id:req.body.facId}).then((result=>{
    res.send("1")
  }))
  .catch(err=>{
    console.log(err)
  })
})

// router.post("/getIndividualFacultyDetails",(req,res)=>{
//   const db1=mongo.get().collection("user");

//   db1.find({_id:req.})
// })

module.exports = router;
