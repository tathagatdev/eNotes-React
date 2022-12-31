import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login =(props) => {
          let navigate=useNavigate();
        const [credentials, setCredentials] = useState(" ")
       
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
       
    
      }
    

    const handleSubmit=async (e)=>{
        e.preventDefault();
       
        //API CALL for LOGIN
           //API CALL
           const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 
           headers: {
              'Content-Type': 'application/json',
             
             
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
          });
          const json= await response.json();
           console.log(json)
           if(json.sucess){
              //  save the auth token we will use it to fetch note apis  and   redirect
              localStorage.setItem('token',json.authToken)
              navigate("/")
              props.showAlert("Login Sucessfull","success")
           }
           else{
            props.showAlert("Invalid Credentials","danger")
           }
          
    }
  return (
    <div><h1>Login Page</h1>
        <form    onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="ermail" className="form-label" >Email address</label>
    <input type="email" value={credentials.email} className="form-control" id="email" name='email' aria-describedby="emailHelp"  onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password"  value={credentials.password}  name='password' className="form-control" id="password" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary"  >Submit</button>
</form>
    </div>
    
  )
}
