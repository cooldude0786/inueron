const express = require('express');
// const bodyParser=require('body-parser');
// const api = require('./api');
const url = require('./routes')
const apiurl = require('./api')
// const dbobj = require('./db')
const app = express();
const http = require("http").createServer(app);
const port = 4240
http.listen(port, '0.0.0.0', () =>
    console.log(`listening on http://localhost:${port}`));

//     app.get('/ins',(req,res)=>{
//     var  ins={
//         name: "khizar",
//         company: "innovind",
//         email:"khizarshaikh2922@gmail.com"
//     }
//     dbobj.user_ins(ins);
//     res.send("user insert") 
// })

app.use("/",url)

app.use("/api",apiurl)

app.use("/Asset", express.static(__dirname + "/Asset"));

app.use("/home/Asset", express.static(__dirname + "/Asset"));
