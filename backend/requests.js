//validate user login from backend
// This file is for Frontend requests

// Validate user login/get user data
async function checkUser(user,pass){
  const response = await fetch('http://localhost:8000/checkusers',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: user, pass: pass})
  });
  if (response.status == 404)
    return response.text();
  else
    return response.json();
}

export default checkUser;