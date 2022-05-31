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
        console.log("Number of documents inserted: " + result.insertedCount);
        r = result
        resolve('done -->' + JSON.stringify(result))
      });
      console.log('yup')
      // console.log(typeof JSON.parse(obj))
    })
  }
  exports.DeleteApprove = (obj) => {
    return new Promise((resolve, reject) => {
      // obj = JSON.parse(obj)
      // console.log(obj,typeof obj)
      db.collection('studentApprove').deleteOne({ _id: ObjectId(obj) }, function (err, result) {
       if (err)
         console.log(err)
         // else{
           console.log('in delete', obj);
           
           resolve(result)
         // }
     })
      // db.collection('Student').insertMany(obj,(err, result)=>{
      //   if (err) throw err;
      // console.log("Number of documents inserted: " + result.insertedCount);
      // resolve('done') 
      // });
      // console.log(typeof JSON.parse(obj))
      // let e  ;
      // obj.forEach( (element) => {
        // console.log('here')
        // console.log('at delete-->', typeof element)
      // });
      // console.log('at herer',e)
      // e = JSON.stringify(e)
      // return e
      // resolve(e)
    })
  }

});
//   }) 