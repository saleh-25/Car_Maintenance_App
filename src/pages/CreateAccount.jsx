import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {deleteUser,createUser,showEntries} from '../../backend/requests.js'
import styles from '../../styles/pages/CreateAccount.module.css'
import UserAgreement from '../components/UserAgreement.jsx';

// Create account page. Creates user login if none exist
function CreateAccount(){
  const navigate = useNavigate();
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const [hiddenMessage, setHiddenMessage] = useState("");
  const [checkedAgreement, setCheckedAgreement] = useState(false);

  //create the account, sends request to backend
  async function handleAccountCreation(){
    const value = await createUser(user,pass);

    const message = `${value.status ==="created" ? "You made an account!" : "A user is registered under that name"}`;
    setHiddenMessage(message);
    setTimeout(()=>{
      setHiddenMessage("");
    },2000)
    if (value.status === "created"){
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
        <UserAgreement checked={[checkedAgreement, setCheckedAgreement]}/>
        <button onClick={checkedAgreement ? handleAccountCreation : null} className={styles[checkedAgreement ? 'create-submit' : 'create-submit-fail']}>
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