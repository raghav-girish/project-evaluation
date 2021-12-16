var express = require("express");
var router = express.Router();
var mongo = require("../../connection");

router.post("/projectDetails", async function(req, res) {
    //console.log("Ss")
    const db1 = mongo.get().collection("project_details");
    //console.log("dkflas");
    //console.log(req.body._id)
    db1.find({_id:parseInt(req.body._id)}).toArray(function(err, result) {
      if (err) console.log(err);
      else{
        //console.log(result);
        res.send(result[0]);
      } 
    });
  });

  module.exports = router;