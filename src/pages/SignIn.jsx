import checkUser from '../../backend/requests';
import {useRef,useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/pages/SignIn.css'


function SignIn(props){
    const navigate = useNavigate();
    const user = useRef();
    const pass = useRef();
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

    //Validate user login (backend interaction)
    //update loginMessage
    async function handleSubmit(){
      document.querySelector('.login-msg').classList.add("fade-in-out")
      let result = await checkUser(user.current.value,pass.current.value);
      
      if (typeof(result) === "object"){
        props.loginstatusChange();
        navigate('/');
        setLoginMessage("Logged In!")
      }else{
        setLoginMessage(result.trim())
      }
      
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
            <input ref={user} type="text"></input>
          </div>
          <div className="login-pass">
            Password <br/>
            <input ref={pass} type="text"></input>
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