const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost";
//const url="mongodb+srv://assif:Assif@99@cluster0-0yalf.mongodb.net/test?retryWrites=true&w=majority"
var mongodb;

async function connect(callback) {
  await MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async function(err, db) {
      mongodb = await db.db('project');
     
      if (mongodb) callback();
      else console.log("MongoDb not connected..!");
    }
  );
}

function get() {
  return mongodb;
}

function close() {
  mongodb.close();
}

module.exports = { connect, get, close };