//MAIN BACKEND FILE

import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json());  

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