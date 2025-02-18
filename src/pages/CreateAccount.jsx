import { useEffect } from 'react';
import carMakeModels from '../assets/data/carInfo';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/CreateAccount.css'
function CreateAccount(){
  const navigate = useNavigate();
  //initialize dropdowns
  useEffect(()=>{
    const element = document.querySelector('.create-year');

    let arr = [];
    for (let i=1950;i<2025;i++){
      arr.push(i);
    }
    arr.forEach((value)=>{
      element.innerHTML += `<option>${value}</option>`
    })
    const element2 = document.querySelector('.create-make');
    carMakeModels.forEach((value)=>{
      element2.innerHTML += `<option>${value.make}</option>`
    })
    const element3 = document.querySelector('.create-model');
    const make = element2.options[element2.selectedIndex].text
    const carObj = carMakeModels.find(car=>car.make === make);
    carObj.models.forEach((value)=>{
      element3.innerHTML += `<option>${value}</option>`
    })
  },[]);
  //update model dropdown based on make
  function handleNewModel(){
    const element2 = document.querySelector('.create-make');
    const element3 = document.querySelector('.create-model');
    const make = element2.options[element2.selectedIndex].text
    const carObj = carMakeModels.find(car=>car.make === make);
    element3.innerHTML = ''
    carObj.models.forEach((value)=>{
      element3.innerHTML += `<option>${value}</option>`
    })
  }
 
  return(
    <div className='page-create'>
      <div className="create">
        <div className="create-title">
          Create an Account
        </div>
        <div className='create-user'>
          What would you like your userName to be?<span style={{color: 'red'}}>*</span><br/>
        </div>
        <input type="text" />
        <div className='create-pass'>
          What would you like your password to be?<span style={{color: 'red'}}>*</span>
        </div>
        <input type="text" />
        <div>What is the year, make, and model of your vehicle?<span style={{color: 'red'}}>*</span></div>
        <select className='create-year'>
        </select>
        <select className='create-make' onChange={handleNewModel}>
        </select>
        <select className='create-model'>
        </select>
        <div>
          Current Mileage?
        </div>
        <input/>
        <button onClick={()=>{navigate('/')}} className='create-submit'>
          Create my account
        </button>
      </div>
    </div>
  );
}

export default CreateAccount;