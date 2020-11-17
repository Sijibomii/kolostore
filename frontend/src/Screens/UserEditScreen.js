import React,{ useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Spinner } from '../components/Spinner' 
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import {Link} from 'react-router-dom'
import './UserEditScreen.css'
export const UserEditScreen = ({match, history}) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <>
      <div className="container">
    <form id="form" className="form" onSubmit={submitHandler}>
      {loading? <Spinner /> :(
        <>
      <h2>User Edit Screen </h2>
      <div className="form-control">
        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" placeholder="Enter Name"  name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
      </div>
      <div className="form-control check">
        <label for="vehicle1">Make Admin</label>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Admin"
         checked={isAdmin}
         onChange={(e) => setIsAdmin(e.target.checked)}/>
      </div>
      
      <button type="submit">Submit</button>
      </>
      )}
    </form>
  </div>
    </>
  )
}
