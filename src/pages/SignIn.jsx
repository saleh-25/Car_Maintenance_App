import checkUser from '../../backend/requests';
import {useRef,useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/pages/SignIn.css'


function SignIn(props){
    const navigate = useNavigate();
    const [user,setUser] = useState("");
    const [pass,setPass] = useState("");
    const [loginMessage,setLoginMessage] = useState();

    // Attach event listener once for loginMessage animation
    useEffect(() => {
      const element = document.querySelector(".login-msg");
      const handleAnimationEnd = () => {
        setLoginMessage("");
        element.classList.remove('fade-in-out');
      };
      if (element) {
        element.addEventListener("animationend", handleAnimationEnd);
      }
    },[]);
    
    //NO SPECIAL CHARACTER CHECKING
    useEffect(()=>{
      const userLower = user.toLowerCase();
      const passLower = pass.toLowerCase();
      let userSpecialCharacters = false;
      let passSpecialCharacters = false;
      for (let i = 0; i < user.length;i++){
        //allows ! or space, 
        if ((userLower.charCodeAt(i) < 48  && userLower.charCodeAt(i) != 32 && userLower.charCodeAt(i) != 33) || (userLower.charCodeAt(i) > 57 && userLower.charCodeAt(i) < 97) || (userLower.charCodeAt(i) > 122)){
          userSpecialCharacters = true;
        }
      }
      for (let i = 0; i < pass.length;i++){
        //allows ! or space, 
        if ((passLower.charCodeAt(i) < 48  && passLower.charCodeAt(i) != 32 && passLower.charCodeAt(i) != 33) || (passLower.charCodeAt(i) > 57 && passLower.charCodeAt(i) < 97) || (passLower.charCodeAt(i) > 122)){
          passSpecialCharacters = true;
        }
      }
      if (userSpecialCharacters){
        document.querySelector(".user-message").innerText = "No special characters allowed!"
      }else{
        document.querySelector(".user-message").innerText = ""
      }
      if (passSpecialCharacters){
        document.querySelector(".pass-message").innerText = "No special characters allowed!"
      }else{
        document.querySelector(".pass-message").innerText = ""
      }
    },[user,pass]);

    //Validate user login (backend interaction)
    //update loginMessage
    async function handleSubmit(){
      document.querySelector('.login-msg').classList.add("fade-in-out")
      let result = await checkUser(user,pass);
      
      if (typeof(result) === "object"){
        props.loginstatusChange();
        navigate('/');
        setLoginMessage("Logged In!")
      }else{
        setLoginMessage(result.trim())
      } 
    }

    function handleUser(event){
      setUser(event.target.value);
    }
    function handlePass(event){
      setPass(event.target.value);
    }
  return(
    <>
      <div className='page'>
        <div className="login">
          <div className="login-title">
            Sign in
          </div>
          <div className="login-user">
            Username/Email <br/>
            <input type="text" onChange={handleUser}></input>
            <div className='user-message'>
              user
            </div>
          </div>

          <div className="login-pass">
            Password <br/>
            <input type="text" onChange={handlePass}></input>
            <div className='pass-message'>
              pass
            </div>
          </div>

          <div className='login-msg'>
            {loginMessage}
          </div>
          <button className="login-submit" onClick={handleSubmit}> Submit</button>
          <div className="login-footer">
            Don't have an account?<br/>
            <Link to="/create-account">Create an account</Link><br/>
            <Link to="/">Back to home?</Link>
            <br/>
            <br/>
            <a href="">Forgot Password?</a><br/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;