const express = require('express');
const { use } = require('express/lib/application');
const router = express.Router();
const Realm = require('realm-web')
async function log() {
    const app = new Realm.App({ id: "inueron-leylz" });
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        const alladmin = await user.functions.getAllAdmin();
            // console.log("connected / sign in", "all admin -->", alladmin)
        return alladmin
    } catch (err) {
        console.error("Failed to log in", err);
        return err
    }
}
router.get('/123',async(req,res)=>{
    let a = await log()
    // console.log('at 123-->',a)
    res.send(a)
    // ,1000)
})
router.get("/",async (req, res) => {
    // console.log("req-->",req,"res-->",res)
   let a = await log()
   console.log("here at 2")
   res.sendFile(__dirname + `/tabs/index.html`)
//    res.send(a)
    console.log("here at 3")
})
router.get("/home/studenthome", (req, res) => {
    res.sendFile(__dirname + `/tabs/studenthome.html`)
})
router.get("/home/teacherlogin", (req, res) => {
    res.sendFile(__dirname + `/tabs/teacherlogin.html`)
})
router.get("/admin", (req, res) => {
    res.sendFile(__dirname + `/tabs/admin.html`)
})
router.get("/login", (req, res) => {
    res.sendFile(__dirname + `/tabs/login.html`)
})
router.get("/adminlogin", (req, res) => {
    res.sendFile(__dirname + `/tabs/adminlogin.html`)
})
router.get("/adminpage", (req, res) => {
    res.sendFile(__dirname + `/tabs/adminhome.html`)
})
router.get("/home/registration", (req, res) => {
    res.sendFile(__dirname + `/tabs/register.html`)
})
module.exports = router