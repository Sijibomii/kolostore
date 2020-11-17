import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Spinner } from '../components/Spinner' 
import { register} from '../actions/userActions'
import {Link} from 'react-router-dom'
import './Signup.css'
export const SignupScreen = ({location, history}) => {
  const [ name , setName]= useState('')
  const [ email , setEmail]= useState('')
  const [ password , setPassword]= useState('')
  const [ confirmPassword , setconfirmPassword]= useState('')
  const redirect = location.search ? location.search.split('=')[1]: '/'

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const{loading, error , userInfo} = userRegister
  useEffect(() => {
   if(userInfo){
  
     history.push(redirect)
   }
  }, [userInfo,redirect,history ])
  const submitHandler=(e)=>{
      e.preventDefault()
      if(error){
        alert(error)
        window.location.href = window.location.href;
      }else{
        if(password !== confirmPassword ){
          alert('Passwords do not match')
        }
        else{
          dispatch(register(name,email, password))
        }
        
      }
      
  }
  return (
    <>
      <div className="container">
    <form id="form" className="form" onSubmit={submitHandler}>
      {loading? <Spinner /> :(
        <>
      <h2>Register With Us</h2>
      <div className="form-control">
        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" placeholder="Enter Name"  name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </div>
      <div className="form-control">
         <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}  />
      </div>
      <div className="form-control">
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          id="password2"
          placeholder="Enter password again"
          value={confirmPassword} onChange={(e)=> setconfirmPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      </>
      )}
    </form>
  </div>
    </>
  )
}
