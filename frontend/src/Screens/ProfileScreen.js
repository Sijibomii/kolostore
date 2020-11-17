import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Spinner } from '../components/Spinner' 
import { getUserDetails, updateUserProfile} from '../actions/userActions'
import {Link} from 'react-router-dom'
import './ProfileScreen.css'
import { USER_DETAILS_FAIL } from '../constants/userConstants'
export const ProfileScreen = ({location, history}) => {
  const [ name , setName]= useState('')
  const [ email , setEmail]= useState('')
  const [ password , setPassword]= useState('')
  const [ confirmPassword , setconfirmPassword]= useState('')

  const dispatch = useDispatch()
  const userDetails = useSelector(state => state.userDetails)
  const{loading, error , user} = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const{ userInfo} = userLogin
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const{ success } = userUpdateProfile
  useEffect(() => {
   if(!userInfo){
     history.push('/auth/login')
   }
   else{
      if(!user.name){
        dispatch(getUserDetails('profile'))
      }else{
          setEmail(user.email)
          setName(user.name)
      }
   }
  }, [userInfo,dispatch,history,user])
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
          dispatch(updateUserProfile({id: user._id, name, email, password}))
          if(success){
            alert('profile updated')
          }
        }
        
      }
      
  }
  return (
    <>
      <div className="container">
    <form id="form" className="form" onSubmit={submitHandler}>
      {loading? <Spinner /> :(
        <>
      <h2>Edit your profile </h2>
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
      <button type="submit">Update</button>
      </>
      )}
    </form>
  </div>
    </>
  )
}
