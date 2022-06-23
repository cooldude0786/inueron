const express = require('express');
const apiRoutes = express.Router();
var bodyParser = require('body-parser');
const dbobj = require('./db');
const { type } = require('express/lib/response');
const { ObjectId } = require('mongodb');
const res = require('express/lib/response');

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

apiRoutes.post('/aL', async (req, res) => {
    let id = req.query.id, password = req.query.pas
    console.log(id, password)
    let temp = await dbobj.loginEmailPassword(id, password);
    res.send(temp)
})

apiRoutes.get('/calldetails', async (req, res) => {
    let temp = await dbobj.getAllAproveStudent()
    res.send(temp)
})
apiRoutes.get('/getTeacher', async (req, res) => {
    let temp = await dbobj.getAllTeacher()
    res.send(temp)
})

apiRoutes.get('/send', async (req, res) => {
    let data = JSON.parse(req.query['data'])
    let data1 = await dbobj.AddApproveStudent(req.query['data']), data2 = []
    data1 = JSON.parse(data1)
    for (element in data) {
        console.log("at api  " + element, data[element])
        let temp1 = await dbobj.DeleteApprove(data[element]['_id'])
        data2.push(temp1)
    }
    await res.send({ data1, data2 })
})
apiRoutes.get('/saveTeacher', async (req, res) => {
    let data = JSON.parse(req.query['data'])
    let myquery = { _id: ObjectId('' + data['_id'] + '') };
    delete data._id
    let newvalues = { $set: data };
    let temp = await dbobj.updateTeacher(myquery, newvalues)
    // console.log(newvalues,myquery)
    res.send(temp)
})
apiRoutes.get('/deleteTeacher', async (req, res) => {
    let data = JSON.parse(req.query['data'])
    console.log(data, typeof data)
    let temp = await dbobj.DeleteApproveTeacher(data.toString())
    console.log('at api', temp)
    res.send(temp)
})

apiRoutes.get('/addteacher', async (req, res) => {
    let temp = req.query
    // console.log('just call',temp)
    let temp1 = await dbobj.addTeacherStudent(temp),
     temp2
    console.log('here', temp1)
    if ( temp1['acknowledged']) {//insert in db
        let obj = {
            tittle: 'Paaword For Teacher Login',
            body: 'Password for your login is ' + temp1['insertedId']
        };
        temp2 = await sendmail(obj)
        temp2 = temp2.split(' ')
        if (temp2.includes('OK')) {//email send
            console.log('wait done', temp2)
            res.send(temp2)
        } else {//email send fails
            temp2 = { error: 'Email not send' }
            res.send(temp2)
            let temp3 = await dbobj.DeleteApproveTeacher(temp1['insertedId'])
            res.send(temp3)
        }
    } else {//insert in db fails
        console.log('not send')
        let temp3 = await dbobj.DeleteApproveTeacher(temp1['insertedId'])
        res.send(temp3)
    }
})
function sendmail(obj) {
    return new Promise((resolve, reject) => {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'khizarshaikh2922@gmail.com',
                pass: 'iywksemzmbkfrtub'
            }
        });

        var mailOptions = {
            from: 'don',
            to: 'dashingboyraj1212@gmail.com',
            subject: obj.tittle,
            text: `${obj.body}`,

        };
        // console.log(obj)
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error.responseCode);
                resolve(error.responseCode)
            } else {
                // console.log('Email sent: ' + info.response);
                resolve(info.response)
            }
            // resolve(obj)
        });
    })
}
//  sdds
module.exports = apiRoutes
// {"_id":{"$oid":"62973c579bab0552de9648b8"},
// name":"KHizar Shaikh","ID":"FS19IF034","departement":"Information Technology",
// "subject":"Math","address":"Malad West Mumbai","phone_no":"8828045311"}