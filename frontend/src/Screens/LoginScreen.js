import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Spinner } from '../components/Spinner' 
import { login} from '../actions/userActions'
import {Link} from 'react-router-dom'
import './Login.css'
export const LoginScreen = ({location, history}) => {
  const [ email , setEmail]= useState('')
  const [ password , setPassword]= useState('')
  const redirect = location.search ? location.search.split('=')[1]: '/'

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const{loading, error , userInfo} = userLogin
  useEffect(() => {
   if(userInfo){
     history.push(redirect)
   }
  }, [userInfo,redirect,history ])
  const submitHandler=(e)=>{
      e.preventDefault()
      
      dispatch(login(email, password))
  }
  return (
    <>
      <div className="container login">
      <div className="form">
      {loading ? <Spinner />:(
        <form onSubmit={submitHandler}>
            <h1>LOGIN </h1>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"name="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password"placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
            </form>
            )}
        <span>
        <h3>New customer? </h3>
        <Link to={redirect ? `/signup?redirect=${redirect}`: `/signup`}>
          <h2>Sign up here!</h2>
        </Link>
        </span>
        </div>
        
      </div>
    </>
  )
}
