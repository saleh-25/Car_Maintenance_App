//MAIN BACKEND FILE

import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config()



import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import webpush from 'web-push';
import bodyParser from 'body-parser';


const app = express();


app.use(cors());
app.use(express.json());  
app.use(bodyParser.json())


const publicVapidKey = "BPRBR3516pFzNP8WufLyCXf2t_ahKLju7MYJgDujqQDmZeenz07sTMcCy_l5uzreTAJU47ZcD4k5fYjWMcP5-64";
const privateVapidKey = "BWbJ1nA2JoJXNpQn5umkVoSY-yx7ZkQMBAMSL1sT-SA";
webpush.setVapidDetails("mailto:test@test.com",publicVapidKey,privateVapidKey);

//subscribe to notifications endpoint
app.post('/subscribe',(req,res) =>{

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

app.post('/groq', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,// Replace with your actual key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen-2.5-32b',
        messages: [
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).send('Error contacting Groq API');
  }
});


console.log(process.env.GROQ_API_KEY)


app.listen(8000);