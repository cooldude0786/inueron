const express = require('express');
// const { use } = require('express/lib/application');
const router = express.Router();


router.get("/", (req, res) => {
    res.sendFile(__dirname + `/tabs/index.html`)
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