import React from 'react'
import { login } from '../../actions/userAction';
import {useDispatch,useSelector} from "react-redux"
import {useEffect,useState} from "react"



function Test() {
    const dispatch=useDispatch();
    const [first, setfirst] = useState(1)
    const {isAuthentication,error}=useSelector(state=>state.user)
    function  hendelclick(){
     dispatch(login("164sumit20@gmail.com","12345678"));
 
 
     }
    function  hendelclickfal(){
     dispatch(login("164sumit20@gmail.com","123456789"));
 
 
    }
        useEffect(() => {
            if(isAuthentication ){
                // alert("succesfuly login")
                // setfirst(first+1);
                alert("login")
            }
            if(error){
                alert(error)   ;
            }
          
        
          
        }, [isAuthentication,first,error])
        
    
    
   return (
     <div>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>Test</h1>
        <h1>{first}</h1>
         <button onClick={hendelclick}>logincorrect</button>
         <button onClick={hendelclickfal}>loginfalse</button>
 
 
       
     </div>
   )
}

export default Test
