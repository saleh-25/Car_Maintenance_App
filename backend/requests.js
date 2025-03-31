//validate user login from backend
// This file is for Frontend requests

const publicVapidKey = "BPRBR3516pFzNP8WufLyCXf2t_ahKLju7MYJgDujqQDmZeenz07sTMcCy_l5uzreTAJU47ZcD4k5fYjWMcP5-64";


// Validate user login/get user data
async function checkUser(user,pass){
  const response = await fetch('https://car-maintenance-app.onrender.com/checkusers',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: user, pass: pass})
  });
  if (response.status == 404)
    return response.text();
  else
    return response.json();
}
//Create a user
async function createUser(user,pass){
  const response = await fetch('https://car-maintenance-app.onrender.com/createuser',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: user, pass: pass})
  });
  const result = await response.json();
  return result
}

//Delete a user
async function deleteUser(user){
  const response = await fetch('https://car-maintenance-app.onrender.com/deleteuser',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: user})
  });
}

//Show entries (debugging)
async function showEntries(){
  const response = await fetch('https://car-maintenance-app.onrender.com/entries');
  console.log(await response.json());
}


//will register service worker, create push, and send push
async function setUpNotifications(){

  //register service worker
  const register = await navigator.serviceWorker.register('worker.js',{
    scope: '/'
  });
}
// technical function needed for setUpNotifications()
function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
  .replace(/\-/g, '+')
  .replace(/_/g,'/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i){
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
//sends a notification
async function sendNotification() {
  const worker = await navigator.serviceWorker.getRegistration()

  if (worker){
    const subscription = await worker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    //send push notification
    await fetch ('https://car-maintenance-app.onrender.com/subscribe',{
      method: 'POST',
      body: JSON.stringify(subscription),
      headers:{
        'content-type': 'application/json'
      }
    });
  }
}

export {checkUser, createUser, deleteUser, showEntries, setUpNotifications, sendNotification};

