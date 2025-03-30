import React, { useRef, useState, useEffect } from 'react';
import styles from '../../styles/pages/ServiceHistory.module.css'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function ServiceHistory() {

  const [services,modifyServices] = useState([]);
  const [entries,modifyEntries] = useState([]);

  const [addEntry,setAddEntry] = useState(false)
  const [inputMessage,setInputMessage] = useState("")

  const [input, setInput] = useState("")
  const [startDate, setStartDate] = useState(new Date());


  function handleKey(event){
    if (event.key == 'Enter'){
        if (entries.length == 0){
          modifyEntries(prev => [...prev, 
            <div key={entries.length} style={{fontSize:'1.5em'}}>{input}</div>
          ])
        }else{
          modifyEntries(prev => [...prev, 
            <div key={entries.length}>{input}</div>
          ])
        }

      setInputMessage("Enter a service done: ")
      setInput("")
      event.target.value = ""
    }
  }
  function makeEntry(event){
    modifyServices(prev => [
      <section key={services.length} className={styles.service}>
        <span className={styles.date}>{startDate.toLocaleDateString()}</span>
        {entries.map((item)=>item)}
      </section>
      ,...prev])
    modifyEntries([])
    setAddEntry(false)
  }

  function handleClick(){
    setAddEntry(true)
    setInputMessage("Name of Service Provider?")
  }
  return (
    <div className={styles.columncontainer}>
      <section className={styles.intro}>
        <h3>
          Service History
        </h3>
        Enter services you've had done to update our records of your vehicle and<br/>
        view service history! <br />
        {addEntry ? <></> : <button style={{padding:'5px 20px 5px 20px'}} onClick={handleClick}>New Entry?</button>}
      </section>

      {addEntry ?
      <section className={styles.createentry}>
        <DatePicker 
          selected={startDate} 
          onChange={(date) => setStartDate(date)} 
        />
        {entries.map((item)=>item)}
        {inputMessage} 
        <input type="text" placeholder="entry" onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}/>
        <button className={styles.submitbutton} onClick={makeEntry}>Create Entry</button>
      </section>
      : false}

      {services.map((item) => item)}
    </div>
  );
}

export default ServiceHistory;
