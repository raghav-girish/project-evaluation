const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongo = require("./connection");
const morgan = require("morgan");
const routes = require("./routes/index");

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb',  extended: false }));
// bodyParser = {
//   json: {limit: '50mb', extended: true},
//   urlencoded: {limit: '50mb', extended: true}
// };
app.use(cors());
app.use(morgan("combined"));

app.use(express.static('uploads'));

mongo.connect( function (err, client) {
  if (err) console.log(err);
  else {    
    console.log("conneted successful");
      mongo.get().collection('user').insert(
      {
        "_id" : "ADMIN",
        "FIRST_NAME" : "",
        "LAST_NAME" : "",
        "DEPARTMENT" : "",
        "COLLEGE" : "",
        "ROLE" : "A",
        "MOBILE" : "",
        "MAIL_ID" : "",
        "PASSWORD" : "21232f297a57a5a743894a0e4a801fc3"
      },(err,result)=>{
        if(err) console.log("ADMIN Id already exist")
        else console.log("ADMIN Id Created")
      }
    )
  }
});


app.listen(5000, () => {
  console.log("server is running on port 5000!");
});



app.use("/project", routes);
