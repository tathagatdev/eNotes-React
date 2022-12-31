import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = (props) => {
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({name:" ",email:" ",cpassword:" ",password:" "})
   
const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
   

  }


const handleSubmit=async (e)=>{
    e.preventDefault();
   // if(credentials.password!==credentials.cpassword)
       //return props.showAlert("Password do not match","danger")
      
    
    //API CALL for SIGNUP
       //API CALL
       const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST', 
       headers: {
          'Content-Type': 'application/json',
         
         
        },
        body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}) 
      });
      const json= await response.json();
       console.log(json)
       if(json.sucess){
          //  save the auth token we will use it to fetch note apis  and   redirect
          localStorage.setItem('token',json.authToken)
          navigate("/")
          props.showAlert("Account Created Successfully","success")
       }
       else{
        props.showAlert("Invalid Credentials","danger")
       }
    
}




    
  return (
    <div  className='container'>
        <form  onSubmit={handleSubmit}>
        <div   className="mb-3">
    
    <label htmlhtmlFor="name"className="form-label">Name</label>
    <input type="text"  className="form-control" id="name" name='name' aria-describedby="emailHelp"  onChange={onChange} required />
    
  </div>
  <div   className="mb-3">
    
    <label htmlhtmlFor="email"className="form-label">Email address</label>
    <input type="email"  className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}  required />
    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div  className="mb-3">
    <label htmlFor="password"  className="form-label">Password</label>
    <input type="password"  className="form-control" id="password" name='password'  onChange={onChange} minLength={5} required />
  </div>
  <div  className="mb-3">
    <label htmlFor="cpassword"  className="form-label">Confirm Password</label>
    <input type="password"  className="form-control" id="cpassword" name='cpassword'  onChange={onChange}  minLength={5} required />
  </div>
  
  
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
