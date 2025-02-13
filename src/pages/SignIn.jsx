import '../../styles/pages/SignIn.css'

function SignIn(){
  return(
    <>
      <div className='page'>
        <div className="login">
          <div className="login-title">
            Sign in
          </div>
          <div className="login-user">
            Username/Email <br/>
            <input type="text"></input>
            <button>Enter</button>
          </div>
          <div className="login-pass">
            Password <br/>
            <input type="text"></input>
            <button>Enter</button>
          </div>
          <div className="login-footer">
            Don't have an account?<br/>
            <a href="">Create Account</a> <br/>
            <br/>
            Forgot Password?<br/>
            <a href="">Sorry</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;