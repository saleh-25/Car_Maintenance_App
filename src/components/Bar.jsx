import { useState,useEffect,useRef } from 'react';
import '../../styles/components/Bar.css'

function Bar(props){
  const [status,setStatus] = useState(false);
  const elem = useRef(null);
  

  function handleClick(){
    setStatus(!status);
  }
  return(
      <>
        <div ref={elem} className="bar" style={{height: status ? elem.current.scrollHeight+"px" : "60px"}} onClick={handleClick}>
          <div className='rowcontainer' style={{marginBottom:"20px", position: 'relative'}}>
            <div className='left'>
              {props.name}
            </div>
            <div className='right'>
                {props.date}
            </div>
            <div className={`arrow ${status ? 'rotate' : ''}`}>&#9660;</div>
          </div>
          {props.children}
      </div>
    </>
  );
}




export default Bar;

