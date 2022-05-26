const res = require("express/lib/response");
const { MongoClient } = require("mongodb");
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
    return new Promise(async (resolve, reject)=>{
      const credentials = Realm.Credentials.emailPassword(email, password);
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        console.log("this is",email,password)
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id,'here');
        resolve(user);
      } 
       catch (err) {
        console.log("Failed to log in"+err);
        resolve({Error:err['error'],errCode:err['errorCode'],statusCode:err['statusCode']});
      }
    })
    
    // catch (err) {
    //   console.error("Failed to log in", err);
    // }
  }

  exports.getAllAproveStudent = () =>{
    return new Promise((resolve,reject)=>{
    db.collection('studentApprove').find().toArray((err,result)=>{
        if(err){
          reject('can not find it '+err)
        }
        // console.log(result)
        resolve(result)
      })
    })
  }

  exports.studentque = (insobj) => {
    return new Promise((resolve, reject) => {
      db.collection('admin').insertOne(insobj, function (err, result) {
        if (err) {
          throw err
        }
        console.log("at db.js")
        resolve(result)
      })

    })
  }
  exports.GetOneDetails = () =>{
    return new Promise((resolve,reject)=>{
      db.collection('studentApprove').findOne({}, function(err, result) {
        if (err) throw err;
        console.log("get one")
        resolve(result)
      })
    })
  }
});
//   })