var express = require("express");
var router = express.Router();
var mongo = require("../../connection")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const multer = require("multer");
const path = require('path');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

router.post("/getReport", async function (req, res) {
    console.log(req.body)
    var location = path.resolve(__dirname, '../../uploads');
    console.log(location)
    var review = req.body.Review;
    fs.writeFileSync(`${location}/review_${review}.csv`, 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    const csvWriter = createCsvWriter({
        path: `${location}/review_${review}.csv`,
        header: [
            { id: 'regno', title: 'Register Number' },
            { id: 'name', title: 'Name' },
            { id: 'marks', title: 'Marks' },
            { id: 'domain', title: 'Domain' },
            { id: 'title', title: 'Tentative Title' },
            { id: 'guide', title: 'Project Guide' },
            { id: 'bno', title: 'Batch No' },
            { id: 'f1', title: 'field1' },
            { id: 'f2', title: 'field2' },
            { id: 'f3', title: 'field3' },
            { id: 'f4', title: 'field4' },
            { id: 'f5', title: 'field5' },
            { id: 'comments', title: 'Comments' },
        ]
    });
    var db = mongo.get().collection('project_details');
    var db1 = mongo.get().collection('review');
    db.find().sort({ _id: 1 }).toArray((err, result) => {
        db1.find({}, { [`REVIEW${review}`]: true }).sort({ _id: 1 }).toArray((err, result1) => {
            console.log(result);
            console.log(result1);
            var data = [];
            for (var i = 0; i < result.length; i++) {
                var temp = {
                    'regno': result[i].LEADREGNO,
                    'name': result[i].LEAD,
                    "marks": result1[i][`REVIEW${review}`].R_Students[0].total,
                    'domain': result[i].PDOMAIN,
                    'title': result[i].PTITLE,
                    'guide': result[i].PFACULTY_NAME,
                    'bno': result[i]._id,
                    'f1': result1[i][`REVIEW${review}`].R_Students[0].q1,
                    'f2': result1[i][`REVIEW${review}`].R_Students[0].q2,
                    'f3': result1[i][`REVIEW${review}`].R_Students[0].q3,
                    'f4': result1[i][`REVIEW${review}`].R_Students[0].q4,
                    'f5': result1[i][`REVIEW${review}`].R_Students[0].q5,
                    "comments": result1[i][`REVIEW${review}`].R_COMMENTS
                }

                data.push(temp)
                
                for (var j = 1; j < result1[i][`REVIEW${review}`].R_Students.length; j++) {
                    temp = {    
                        'regno': result1[i][`REVIEW${review}`].R_Students[j].RegNo,
                        'name': result1[i][`REVIEW${review}`].R_Students[j].Name,
                        "marks": result1[i][`REVIEW${review}`].R_Students[j].total,

                        // 'domain': "",
                        // 'title': "",
                        // 'guide': "",
                        // 'bno': "",

                        'f1': result1[i][`REVIEW${review}`].R_Students[j].q1,
                        'f2': result1[i][`REVIEW${review}`].R_Students[j].q2,
                        'f3': result1[i][`REVIEW${review}`].R_Students[j].q3,
                        'f4': result1[i][`REVIEW${review}`].R_Students[j].q4,
                        'f5': result1[i][`REVIEW${review}`].R_Students[j].q5,

                        // "comments": "",
                    }
                    
                data.push(temp)
                }
            }
            console.log(result1[0][`REVIEW${review}`].R_Students[0].q1)
            csvWriter
                .writeRecords(data)
                .then(() => {
                    console.log('The CSV file was written successfully')
                });

            res.send(`http://localhost:5000/review_${review}.csv`)
        })

    })

})



module.exports = router;
