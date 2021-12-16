var express = require("express");
var router = express.Router();
var mongo = require("../../connection");

router.post("/", async function(req, res) {
    //console.log(req.body);
    var basicform = {
        _id: req.body._id,
        project_and_problem: req.body.project_and_problem,
        interdiciplinary:req.body.interdiciplinary,
        foucs: req.body.foucs,
        objectives: req.body.objectives,
        methodology: req.body.methodology,
        location: req.body.location,
        duration: req.body.duration,
    };
    //console.log(basicform)
    const db1 = mongo.get().collection("basic_form");
    
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
                    project_and_problem: req.body.project_and_problem,
                    interdiciplinary: req.body.interdiciplinary,
                    foucs: req.body.foucs,
                    objectives: req.body.objectives,
                    methodology: req.body.methodology,
                    location: req.body.location,
                    duration: req.body.duration,
                }
            }
        )
        // console.log(result);
        result.status=1;
        console.log(result);
        res.send(result);
    } else {        
        db1.insertOne(basicform);
        // console.log(status);
        result.status=0;
        console.log(result);
        res.send(result);
    }  
});

router.post("/getBasicFormDetails", async function(req, res) {
    console.log("working");
    console.log(req.body._id);
    const db1 = mongo.get().collection("basic_form");
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
