//MAIN BACKEND FILE

import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json());  

//Validate user login and/or return user data
app.post('/checkusers',(req,res) =>{
  const data = req.body;

  //Call validate login method in Python Script
  const pyScript = spawn('python',['backend/dataConnect.py','validLogin',req.body.user,req.body.pass])

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

app.listen(8000);