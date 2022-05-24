const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://khizar:Khizar2922@cluster0.ijkkm.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "iNueron";

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Connection failed for some reason");
  }
  console.log("Connection established - All well");
  const db = client.db(databaseName);
  exports.user_ins = (insobj) => {
    db.collection('admin').insertOne(insobj, function (err, result) {
      if (err) {
        throw err
      }

      console.log("inserted")
    })
    console.log("value", insobj['_id'])
  }
  exports.studentque = (insobj) => {
    db.collection('admin').insertOne(insobj, function (err, result) {
      if (err) {
        return "err"
      } 
        console.log("done1")
        return insobj.success = "done"
      
    })
  }
});
//   })