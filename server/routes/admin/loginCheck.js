var express = require("express");
var router = express.Router();
var mongo = require("../../connection");
var md5 = require('md5');

router.post("/", async function (req, res) {
  const db1 = mongo.get().collection("user");

 var result = {  
  status:'',
  role:'',
  uname:''
  };
  var ar = await db1.find({ _id: req.body.USER_ID, PASSWORD: md5(req.body.PASSWORD) }).toArray();
  console.log(ar)
  if (ar.length > 0) {
    result.status = 1;
    result.role = ar[0].ROLE;
	result.uname=ar[0].FIRST_NAME+" "+ar[0].LAST_NAME;
    console.log(result);
    res.send(result);
  }
  else {
    result.status = 2;
    console.log(result);
    res.send(result);
  }

});

// router.get("/facultyCheck", async function (req, res) {

//   console.log(req.body)
//   const db1 = mongo.get().collection("user");

//   db1.find({}).toArray(function (err, result) {
//     if (err) console.log(err);
//     else res.send(result);
//   });
// });


module.exports = router;
