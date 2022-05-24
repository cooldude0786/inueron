const express = require('express');
const apiRoutes = express.Router();
var bodyParser = require('body-parser');
const Realm = require('realm-web');
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://khizar:Khizar2922@cluster0.ijkkm.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "iNueron";

MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Connection failed for some reason");
    }
    console.log("Connection established - All well");
    const db = client.db(databaseName);
    user_ins = (insobj) => {
        db.collection('admin').insertOne(insobj, function (err, result) {
            if (err) {
                throw err
            }

            console.log("inserted")
        })
        console.log("value", insobj['_id'])
    }
    function studentque(insobj) {
       let df 
       db.collection('studentApprove').insertOne(insobj,  function (err, result) {
            if (err) {
                throw err
            }
            df = result['acknowledged'].toString() 
        })
        console.log('val',df)
        return df
    }
    apiRoutes.post('/userform', async (req, res) => {
        console.log("called Api")
        let c = studentque(req.query)
        console.log('from',c)
        res.send('df');
    })
});

const app = new Realm.App({ id: "inueron-leylz" });
// async function Anonlog() {
//     const credentials = Realm.Credentials.anonymous();
//     try {
//         const user = await app.logIn(credentials);
//         const alladmin = await user.functions.getAllAdmin();
//         // console.log("connected / sign in", "all admin -->", alladmin)
//         return alladmin
//     } catch (err) {
//         console.error("Failed to log in", err);
//         return err
//     }
// }

async function loginEmailPassword(email, password) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.emailPassword(email, password);
    try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        console.log("this is")
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
    } catch {
        console.log("Failed to log in");
        return "failed in login";
    }
}

apiRoutes.get('/321', async (req, res) => {
    const user = await loginEmailPassword("joe.jasper@example.com", "passw0rd");
    // console.log("Successfully logged in!", user);
    res.send(user)
})







apiRoutes.get('/123', async (req, res) => {
    let a = await Anonlog()
    // console.log('at 123-->',a)
    res.send(a)
    // ,1000)
})


module.exports = apiRoutes