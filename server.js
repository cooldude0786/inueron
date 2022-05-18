var express = require('express');
const app = express();
const http = require("http").createServer(app);
const port = 4240
http.listen(port, '0.0.0.0', () =>
    console.log(`listening on http://localhost:${port}`));

app.use("/Asset", express.static(__dirname + "/Asset"));
app.use("/home/Asset", express.static(__dirname + "/Asset"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+`/tabs/index.html`)
})
app.get("/home/studenthome",(req,res)=>{
    res.sendFile(__dirname+`/tabs/studenthome.html`)
})
app.get("/home/teacherlogin",(req,res)=>{
    res.sendFile(__dirname+`/tabs/teacherlogin.html`)
})
app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+`/tabs/admin.html`)
}) 
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+`/tabs/login.html`)
})
app.get("/adminlogin",(req,res)=>{
    res.sendFile(__dirname+`/tabs/adminlogin.html`)
}) 
app.get("/adminpage",(req,res)=>{
    res.sendFile(__dirname+`/tabs/adminhome.html`)
})
app.get("/home/registration",(req,res)=>{
    res.sendFile(__dirname+`/tabs/register.html`)
})  