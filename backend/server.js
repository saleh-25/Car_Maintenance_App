//MAIN BACKEND FILE

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();


app.use(cors());
app.use(express.json());  
app.use(bodyParser.json())


const publicVapidKey = "BPRBR3516pFzNP8WufLyCXf2t_ahKLju7MYJgDujqQDmZeenz07sTMcCy_l5uzreTAJU47ZcD4k5fYjWMcP5-64";
const privateVapidKey = "BWbJ1nA2JoJXNpQn5umkVoSY-yx7ZkQMBAMSL1sT-SA";
webpush.setVapidDetails("mailto:test@test.com",publicVapidKey,privateVapidKey);

//subscribe to notifications endpoint
app.post('/subscribe',(req,res) =>{
  console.log('called')

  // service worker needs subscription and data info
  const subscription = req.body;
  const info = JSON.stringify({title: 'Push Test', body: "testing your notification what's up aly, ali, matthew and ahad"});

  // send notification
  webpush.sendNotification(subscription, info).catch(err => console.error(err));
});

//Validate user login and/or return user data
app.post('/checkusers',(req,res) =>{
  //Call validate login method in Python Script
  const pyScript = spawn('python',['dataConnect.py','validLogin',req.body.user,req.body.pass])

  //Show output of Python Script. Output is one of:
  // 1) "No user found"
  // 2) "Wrong password"
  // 3) validated login, and sends user's data
  pyScript.stdout.on('data', (data) => {
    const info = data.toString().trim()
    if (info === "wrong password" || info ==="no user found")
      res.status(404).send(info);
    else
      res.status(200).send(info);
  });

  // For error in file & checking it closed (when I'm debugging)
  pyScript.stderr.on('data', (data) => {
    console.error(`Python error: ${data.toString()}`);
  });
  pyScript.on('close',(code)=>{
    console.log(`Python script finished with exit code ${code}`);
  })
});

//Add a user login
app.post('/createuser',(req,res)=>{
  //Call create user method in Python Script
  const pyScript = spawn('python',['dataConnect.py','createUser',req.body.user,req.body.pass])

  //Show output of Python Script.
  pyScript.stdout.on('data', (data) => {
    const result = {'status' : parseInt(data.toString())};
    res.json(result);
  });

  // For error in file & checking it closed (when I'm debugging)
  pyScript.stderr.on('data', (data) => {
    console.error(`Python error: ${data.toString()}`);
  });
  pyScript.on('close',(code)=>{
    console.log(`Python script finished with exit code ${code}`);
  })
})

//delete a user login
app.post('/deleteuser',(req,res)=>{
  //Call create user method in Python Script
  const pyScript = spawn('python',['dataConnect.py','deleteUser',req.body.user])

  //Show output of Python Script.
  pyScript.stdout.on('data', (data) => {
    res.end()
  });

  // For error in file & checking it closed (when I'm debugging)
  pyScript.stderr.on('data', (data) => {
    console.error(`Python error: ${data.toString()}`);
  });
  pyScript.on('close',(code)=>{
    console.log(`Python script finished with exit code ${code}`);
  })
})

//check entries
app.get('/entries',(req,res)=>{
  //Call create user method in Python Script
  const pyScript = spawn('python',['dataConnect.py','showEntries'])
  //Show output of Python Script.
  pyScript.stdout.on('data', (data) => {
    console.log(data.toString())
    res.json(data.toString())
  });

  // For error in file & checking it closed (when I'm debugging)
  pyScript.stderr.on('data', (data) => {
    console.error(`Python error: ${data.toString()}`);
  });
  pyScript.on('close',(code)=>{
    console.log(`Python script finished with exit code ${code}`);
  })
})



app.listen(8000);