//validate user login from backend
// This file is for Frontend requests

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

export default checkUser;
export {createUser, deleteUser, showEntries};