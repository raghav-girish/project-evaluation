var express = require("express");
var router = express.Router();
var mongo = require("../../connection");

router.post("/", async function (req, res) {
  const db1 = mongo.get().collection("project_details");

  var max = await db1
    .find({})
    .sort({ _id: -1 })
    .toArray();

  var answer = {
    status: "",
    id: ""
  };
  if (max.length === 0) {
    max = 1;
  } else {
    max = max[0]._id + 1;
  }

  var projectDetails = {
    _id: max,
    PTITLE: req.body.PTITLE,
    PDOMAIN: req.body.PDOMAIN,
    PFACULTY: req.body.PFACULTY,
    PFACULTY_NAME: req.body.PFACULTY_NAME,
    LEAD: req.body.LEAD,
    LEADREGNO: req.body.LEADREGNO,
    S1NAME: req.body.S1NAME,
    S1NO: req.body.S1NO,
    S2NAME: req.body.S2NAME,
    S2NO: req.body.S2NO,
    S3NAME: req.body.S3NAME,
    S3NO: req.body.S3NO,
    PROGRESS: 0,
    STATUS: "ACTIVE"
  };

  await db1.insertOne(projectDetails, function (err, result) {
    answer.status = "sucess";
    answer.id = max;
    //console.log(answer);
    res.send(answer);
  });

  const db = mongo.get().collection("review");
  var _id = max;
  //console.log(_id);
  var rev = {
    _id: _id,
    REVIEW1: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Students: [{
        Name: req.body.LEAD,
        RegNo: req.body.LEADREGNO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S1NAME,
        RegNo: req.body.S1NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S2NAME,
        RegNo: req.body.S2NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S3NAME,
        RegNo: req.body.S3NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      }],
      R_PROGRESS: 0
    },
    REVIEW2: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Students: [{
        Name: req.body.LEAD,
        RegNo: req.body.LEADREGNO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S1NAME,
        RegNo: req.body.S1NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S2NAME,
        RegNo: req.body.S2NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S3NAME,
        RegNo: req.body.S3NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      }],
      R_PROGRESS: 0
    },
    REVIEW3: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Students: [{
        Name: req.body.LEAD,
        RegNo: req.body.LEADREGNO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S1NAME,
        RegNo: req.body.S1NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S2NAME,
        RegNo: req.body.S2NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S3NAME,
        RegNo: req.body.S3NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      }],
      R_PROGRESS: 0
    },
    REVIEW4: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Students: [{
        Name: req.body.LEAD,
        RegNo: req.body.LEADREGNO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S1NAME,
        RegNo: req.body.S1NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S2NAME,
        RegNo: req.body.S2NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S3NAME,
        RegNo: req.body.S3NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      }],
      R_PROGRESS: 0
    },
    REVIEW5: {
      R_DATE: "",
      R_POINTS: "",
      R_COMMENTS: "",
      R_SUGGESTIONS: "",
      R_Students: [{
        Name: req.body.LEAD,
        RegNo: req.body.LEADREGNO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S1NAME,
        RegNo: req.body.S1NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S2NAME,
        RegNo: req.body.S2NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      },
      {
        Name: req.body.S3NAME,
        RegNo: req.body.S3NO,
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
        q5: 0,
        total: 0
      }],
      R_PROGRESS: 0
    },
    OVERALL_PROGRESS: 0
  };
  db.insert(rev);
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  const db2 = mongo.get().collection("project_duration");
  db2.insert({
    _id: max,
    START_DATE: toTimestamp(new Date()),
    END_DATE: 0
  });

});

router.get("/getProjectDetails", async function (req, res) {
  const db1 = mongo.get().collection("project_details");

  db1
    .find({})
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      if (err) console.log(err);
      else res.send(result);
    });
});

router.post("/getIndividualProject", async function (req, res) {
  //console.log("Ss")
  const db1 = mongo.get().collection("project_details");
  //console.log("dkflas");
  //console.log(req.body._id)
  db1.find({ _id: parseInt(req.body._id) }).toArray(function (err, result) {
    if (err) console.log(err);
    else {
      //console.log(result);
      res.send(result);
    }
  });
});

router.post("/getProjectDuration", async function (req, res) {
  //console.log("Ss")
  const db1 = mongo.get().collection("project_duration");
  //console.log("dkflas");
  //console.log(req.body._id)
  db1.find({ _id: parseInt(req.body._id) }).toArray(function (err, result) {
    if (err) console.log(err);
    else {
      //console.log(result);
      res.send(result);
    }
  });
});

router.post("/getFacultyProjectDetails", async function (req, res) {
  const db1 = mongo.get().collection("project_details");
  var name = "";
  db1.find({ PFACULTY: req.body.PFACULTY }).toArray(function (err, result) {
    if (err) console.log(err);
    else {
      res.send(result);
      //console.log(result);
    }
    //res.send(result)};
  });
});

router.post('/deleteProject', async (req, res) => {
  console.log(req.body);
  const db = mongo.get().collection("project_details");
  const db1 = mongo.get().collection("project_duration");
  const db2 = mongo.get().collection("basic_form");
  const db3 = mongo.get().collection("srs_form");
  const db4 = mongo.get().collection("review");
  await db.remove({ _id: req.body.proId }).then(result => { console.log('deleted1') }).catch(err => console.log(err))
  await db1.remove({ _id: req.body.proId }).then(result => { console.log('deleted2') }).catch(err => console.log(err))
  await db2.remove({ _id: req.body.proId }).then(result => { console.log('deleted3') }).catch(err => console.log(err))
  await db3.remove({ _id: req.body.proId }).then(result => { console.log('deleted4') }).catch(err => console.log(err))
  await db4.remove({ _id: req.body.proId }).then(result => { console.log('deleted5') }).catch(err => console.log(err))
  res.send('1')
})

router.post('/updateProject', (req, res) => {
  console.log(req.body);
  const db = mongo.get().collection("project_details");
  const db1 = mongo.get().collection("review");
  db.update({ _id: req.body._id },
    {
      $set: req.body
    })
    .then(async result => {
      var a = await db1.findOne({ _id: req.body._id });
      console.log(a.REVIEW1.R_Students)
      await db1.updateOne(
        { _id: req.body._id, "REVIEW1.R_Students.RegNo": a.REVIEW1.R_Students[0].RegNo },
        {
          $set: {
            "REVIEW1.R_Students.$.Name": req.body.LEAD, "REVIEW1.R_Students.$.RegNo": req.body.LEADREGNO,
            "REVIEW2.R_Students.$.Name": req.body.LEAD, "REVIEW2.R_Students.$.RegNo": req.body.LEADREGNO,
            "REVIEW3.R_Students.$.Name": req.body.LEAD, "REVIEW3.R_Students.$.RegNo": req.body.LEADREGNO,
            "REVIEW4.R_Students.$.Name": req.body.LEAD, "REVIEW4.R_Students.$.RegNo": req.body.LEADREGNO,
            "REVIEW5.R_Students.$.Name": req.body.LEAD, "REVIEW5.R_Students.$.RegNo": req.body.LEADREGNO,
          }
        }
      )
      if (req.body.S1NAME !== "" && req.body.S1NO !== "") {
        await db1.updateOne(
          { _id: req.body._id, "REVIEW1.R_Students.RegNo": a.REVIEW1.R_Students[1].RegNo },
          {
            $set: {
              "REVIEW1.R_Students.$.Name": req.body.S1NAME, "REVIEW1.R_Students.$.RegNo": req.body.S1NO,
              "REVIEW2.R_Students.$.Name": req.body.S1NAME, "REVIEW2.R_Students.$.RegNo": req.body.S1NO,
              "REVIEW3.R_Students.$.Name": req.body.S1NAME, "REVIEW3.R_Students.$.RegNo": req.body.S1NO,
              "REVIEW4.R_Students.$.Name": req.body.S1NAME, "REVIEW4.R_Students.$.RegNo": req.body.S1NO,
              "REVIEW5.R_Students.$.Name": req.body.S1NAME, "REVIEW5.R_Students.$.RegNo": req.body.S1NO,
            }
          }
        )
      }

      if (req.body.S2NAME !== "" && req.body.S2NO !== "") {
        await db1.updateOne(
          { _id: req.body._id, "REVIEW1.R_Students.RegNo": a.REVIEW1.R_Students[2].RegNo },
          {
            $set: {
              "REVIEW1.R_Students.$.Name": req.body.S2NAME, "REVIEW1.R_Students.$.RegNo": req.body.S2NO,
              "REVIEW2.R_Students.$.Name": req.body.S2NAME, "REVIEW2.R_Students.$.RegNo": req.body.S2NO,
              "REVIEW3.R_Students.$.Name": req.body.S2NAME, "REVIEW3.R_Students.$.RegNo": req.body.S2NO,
              "REVIEW4.R_Students.$.Name": req.body.S2NAME, "REVIEW4.R_Students.$.RegNo": req.body.S2NO,
              "REVIEW5.R_Students.$.Name": req.body.S2NAME, "REVIEW5.R_Students.$.RegNo": req.body.S2NO,
            }
          }
        )
      }

      if (req.body.S3NAME !== "" && req.body.S3NO !== "") {
        await db1.updateOne(
          { _id: req.body._id, "REVIEW1.R_Students.RegNo": a.REVIEW1.R_Students[3].RegNo },
          {
            $set: {
              "REVIEW1.R_Students.$.Name": req.body.S3NAME, "REVIEW1.R_Students.$.RegNo": req.body.S3NO,
              "REVIEW2.R_Students.$.Name": req.body.S3NAME, "REVIEW2.R_Students.$.RegNo": req.body.S3NO,
              "REVIEW3.R_Students.$.Name": req.body.S3NAME, "REVIEW3.R_Students.$.RegNo": req.body.S3NO,
              "REVIEW4.R_Students.$.Name": req.body.S3NAME, "REVIEW4.R_Students.$.RegNo": req.body.S3NO,
              "REVIEW5.R_Students.$.Name": req.body.S3NAME, "REVIEW5.R_Students.$.RegNo": req.body.S3NO,
            }
          }
        )
      }


      res.send('sucess')

    })
})


module.exports = router;
