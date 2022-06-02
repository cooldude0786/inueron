const { type } = require("express/lib/response");
const res = require("express/lib/response");
const { MongoClient, ObjectId } = require("mongodb");
const Realm = require('realm-web');
const uri = "mongodb+srv://khizar:Khizar2922@cluster0.ijkkm.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "iNueron";
const app = new Realm.App({ id: "inueron-leylz" });

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log("Connection failed for some reason");
  }

  console.log("Connection established - All well");
  const db = client.db(databaseName);


  exports.loginEmailPassword = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      const credentials = Realm.Credentials.emailPassword(email, password);
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        console.log("this is", email, password)
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id, 'here');
        resolve(user);
      }
      catch (err) {
        console.log("Failed to log in" + err);
        resolve({ Error: err['error'], errCode: err['errorCode'], statusCode: err['statusCode'] });
      }
    })

    // catch (err) {
    //   console.error("Failed to log in", err);
    // }
  }

  exports.getAllAproveStudent = () => {
    return new Promise((resolve, reject) => {
      db.collection('studentApprove').find().toArray((err, result) => {
        if (err) {
          reject('can not find it ' + err)
        }
        // console.log(result)
        resolve(result)
      })
    })
  }

  exports.studentque = (insobj) => {
    return new Promise((resolve, reject) => {
      db.collection('studentApprove').insertOne(insobj, function (err, result) {
        if (err) {
          throw err
        }
        console.log("at db.js")
        resolve(result)
      })

    })
  }
  exports.AddApproveStudent = (obj) => {
    return new Promise(async (resolve, reject) => {
      let r;
      obj = JSON.parse(obj)
      await db.collection('Student').insertMany(obj, (err, result) => {
        if (err) throw err;
        r = result
        resolve(JSON.stringify(result))
      });
    })
  }
  exports.DeleteApprove = (obj) => {
    return new Promise((resolve, reject) => {
      db.collection('studentApprove').deleteOne({ _id: ObjectId(obj) }, function (err, result) {
        if (err)
          console.log(err)
        console.log('in delete', obj);
        resolve(result)
      })

    })
  }


  exports.getAllTeacher = () => {
    return new Promise((resolve, reject) => {
      db.collection('teacher').find().toArray((err, result) => {
        if (err) {
          reject('can not find it ' + err)
        }
        // console.log(result)
        resolve(result)
      })
    })
  }


  exports.updateTeacher = (query, values) => {
    return new Promise((resolve, reject) => {
      const options = { upsert: true };
      // query = { _id: ObjectId('62973c579bab0552de9648b8')}
      // values = {$set:{name:"khizar123",ID:'khiaxa'} }
      console.log('at db')
      db.collection("teacher").updateOne(query, values, options, function (err, result) {
        if (err) console.log(err);
        console.log(result);
        resolve(result)
      });
      console.log(query, values)
    })
  }
  exports.DeleteApproveTeacher = async (obj) => {
    return new Promise((resolve, reject) => {
      db.collection('teacher').deleteOne({ _id: ObjectId(obj) }, function (err, result) {
        if (err)
          console.log(err)
        console.log('in delete',typeof obj);
        resolve(result)
      })

    })
    }
});
//   }) 