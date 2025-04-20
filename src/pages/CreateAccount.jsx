import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {deleteUser,createUser,showEntries} from '../../backend/requests.js'
import styles from '../../styles/pages/CreateAccount.module.css'

// Create account page. Creates user login if none exist
function CreateAccount(){
  const navigate = useNavigate();
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const [hiddenMessage, setHiddenMessage] = useState("");

  //create the account, sends request to backend
  async function handleAccountCreation(){
    const value = await createUser(user,pass);

    const message = `${value.status ? "You made an account!" : "A user is registered under that name"}`;
    setHiddenMessage(message);
    setTimeout(()=>{
      setHiddenMessage("");
    },2000)
    if (value.status){
      navigate('/');
    }
  }
  return(
    <div className={styles['page-create']}>
      <div className={styles["create"]}>
        <div className={styles["create-title"]}>
          Create an Account
        </div>
        <div className={styles['create-user']}>
          What would you like your username to be?<span style={{color: 'red'}}>*</span><br/>
        </div>
        <input type="text" onChange={(e) => {setUser(e.target.value);}}/>
        <div className={styles['create-pass']}>
          What would you like your password to be?<span style={{color: 'red'}}>*</span>
        </div>
        <input type='text' onChange={(e) =>{setPass(e.target.value);}}/>
        <button onClick={handleAccountCreation} className={styles['create-submit']}>
          Create my account
        </button>
        <div className={styles['create-submit-message']}>
         {hiddenMessage}
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;