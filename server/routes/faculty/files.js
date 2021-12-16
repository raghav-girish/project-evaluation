var express = require("express");
var router = express.Router();
var mongo = require("../../connection");
const MongoDB = require("mongodb")
var md5 = require('md5');
var fs=require('fs');
const path = require('path');
const imageDataURI = require("image-data-uri");
const tesseract = require("node-tesseract-ocr")
const multer = require("multer");

const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage: storage })

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

router.post("/upload", upload.array('files'), function (req, res) {
  var db = mongo.get().collection('files');
  var obj = JSON.parse(req.body.data);
  console.log(obj)
  var fileNames = [];
  for (var i = 0; i < req.files.length; i++) {
    fileNames.push(req.files[i].filename);
  }
  var dataToInsert = {
    TITLE: obj.title.trim(),
    DESCRIPTION: obj.description,
    FACULTY_FNAME: obj.facultyFirstName,
    FACULTY_LNAME: obj.faculutyLastName,
    FACULTY_ID: obj.facultyId,
    Data: toTimestamp(obj.date),
    HIGH: obj.highKey.trim().toLowerCase(),
    MEDIUM: obj.mediumKey.trim().toLowerCase(),
    LOW: obj.lowKey.trim(),
    VERY_LOW: obj.veryKey.trim().toLowerCase(),
    PATH: fileNames
  }
  db.insert(dataToInsert, (err, result) => {
    if (err) {
      console.log(err)
      res.send('error')
    }
    else {
      res.send('sucess');
    }
  })

});


router.post("/imagerec", function (req, res) {
  //console.log(req.body);
  let dataURI = req.body.dataUri;

  // It will create the full path in case it doesn't exist
  // If the extension is defined (e.g. fileName.png), it will be preserved, otherwise the lib will try to guess from the Data URI

  // let filePath = './out/path/fileName';
  let filePath = './uploads/recimage';

  // Returns a Promise
  imageDataURI.outputFile(dataURI, filePath)

    // RETURNS image path of the created file 'out/path/fileName.png'
    .then(result => {
      console.log(result)
      tesseract.recognize("./uploads/recimage.png", config)
        .then(text => {
          console.log("Result:", text)
          res.send(text);
        })
        .catch(error => {
          console.log(error.message)
        })
    })

});

router.post('/find', async (req, res) => {
  console.log(req.body.search)
  findResult = [];
  var db = mongo.get().collection('files');
  var re = new RegExp('^' + req.body.search + '$', 'i');
  console.log(re)
  await db.find({ "TITLE": { '$regex': re } }).toArray((err, result) => {
    console.log(result)
    result.map((v, i) => {
      findResult.push(v);
    })
    console.log('start')
    db.find({ "HIGH": req.body.search.toLowerCase() }).toArray((err, result) => {
      console.log(result)
      result.map((v, i) => {
        findResult.push(v);
      })
      console.log('1')
      db.find({ "MEDIUM": req.body.search.toLowerCase() }).toArray((err, result) => {
        console.log(result)
        result.map((v, i) => {
          findResult.push(v);
        })
        console.log('2')
        db.find({ "LOW": req.body.search.toLowerCase() }).toArray((err, result) => {
          console.log(result)
          result.map((v, i) => {
            findResult.push(v);
          })
          console.log('3')
          db.find({ "VERY_LOW": req.body.search.toLowerCase() }).toArray((err, result) => {
            console.log(result)
            result.map((v, i) => {
              findResult.push(v);
            })
            console.log('4')
            res.send(findResult)
          })
        })

      })
    })
  })
})

router.get('/getAllFiles', (req, res) => {
  var db = mongo.get().collection('files');
  console.log('dsfs')
  db.find().toArray((err, result) => {
    console.log(result)
    res.send(result);
  })
})

router.post('/deleteFile', async (req, res) => {
  var db = mongo.get().collection('files');
  console.log(req.body)

  await db.findOne({ _id: new MongoDB.ObjectId(req.body.fileId) })
    .then(result => {
      console.log(result.PATH);
      console.log(path.resolve(__dirname, '../../uploads'))
      result.PATH.map((v, i) => {
        fs.unlinkSync(path.resolve(__dirname, `../../uploads/${v}`));
          console.log('File deleted!'+i);
        
      })

    })

  await db.remove({_id:new MongoDB.ObjectId(req.body.fileId)})
  .then((result)=>{
    console.log(1);
    res.send('1')
  })
  .catch(err=>{
    console.log('err')
  })  
})

module.exports = router;
