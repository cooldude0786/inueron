const express = require('express');
const apiRoutes = express.Router();
var bodyParser = require('body-parser');
const dbobj = require('./db');
const { type } = require('express/lib/response');

apiRoutes.get('/321', async (req, res) => {
    const user = await dbobj.loginEmailPassword("khizar2922@gmail.com", "khizar");
    res.send(user)
})

apiRoutes.post('/userform', async (req, res) => {
    console.log("called Api")
    let temp = await dbobj.studentque(req.query)
    res.send(temp);
})


apiRoutes.get('/123', async (req, res) => {
    let a = await Anonlog()
    // console.log('at 123-->',a)
    res.send(a)
    // ,1000)
})

apiRoutes.post('/aL',async (req,res)=>{
    let id=req.query.id , password = req.query.pas
    console.log(id,password)
    let temp =await dbobj.loginEmailPassword(id,password);
    res.send(temp)
})

apiRoutes.get('/calldetails',async (req,res)=>{
    let temp =await dbobj.getAllAproveStudent()
    res.send(temp)
})

apiRoutes.get('/send',async (req,res)=>{
    // let temp = await dbobj.GetOneDetails(req.query['data'].split(","))
    console.log('at api req',req.query)
    res.send('temp')
    // console.log("at api  ",temp)
})
//  sdds
module.exports = apiRoutes 