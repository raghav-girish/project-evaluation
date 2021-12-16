var express = require("express");
var router = express.Router();
var mongo = require("../../connection");

router.post("/", async function(req, res) {
    console.log(req.body);
    const db1 = mongo.get().collection("srs_form");
    var srsform = {
        _id: req.body._id,
        introduction: req.body.introduction,
        abstract:req.body.abstract,
        users: req.body.users,
        functionality: req.body.functionality,
        componet: req.body.componet,
        software: req.body.software,
        scope: req.body.scope,
        interface: req.body.interface
    };
    var result={
        status:''
    }
    var ar = await db1.find({ _id: parseInt(req.body._id) }).toArray();
    console.log(ar);
    if (ar.length > 0) {
        db1.update( 
            { _id: req.body._id },
            {$set:
                {
                    introduction: req.body.introduction,
                    abstract: req.body.abstract,
                    users: req.body.users,
                    functionality: req.body.functionality,
                    componet: req.body.componet,
                    software: req.body.software,
                    scope: req.body.scope,
                    interface: req.body.interface
                }
            }
        )
        // console.log(result);
        result.status=1;
        res.send(result);
    } else {        
        db1.insertOne(srsform);
        // console.log(status);
        result.status=0;
        res.send(result);
    }  
});

router.post("/getSRSDetails", async function(req, res) {
    //console.log("working");
    //console.log(req.body._id);
    const db1 = mongo.get().collection("srs_form");
    var a=parseInt(req.body._id)
    db1.find({_id:a}).toArray(function(err, result) {
        if (err) console.log(err);
        else{ 		
              //res.send(result);
              console.log(result);
              res.send(result);
           }
        })
})



module.exports = router;
