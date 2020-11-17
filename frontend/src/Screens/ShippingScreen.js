
import './ShippingScreen.css'
import React, { useState } from 'react'
import { saveShippingAddress,savePaymentMethod} from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
export const ShippingScreen = ({history}) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)
  const [payment, setPayment] = useState('stripe')
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    dispatch(savePaymentMethod(payment))
    history.push('/placeorder')
  }
  return (
    <>
      <div className="container">
      <div className="form-container-shipping">
        <form action="#" className="form">
          <h2>SHIPPING DETAILS</h2>
          <div className="form-control">
            <label htmlFor="Address">Address</label>
            <input type="text" id="address" placeholder="Enter Address" value={address} onChange={(e)=> setAddress(e.target.value)} required/>
            
          </div>
          <div className="form-control">
            <label htmlFor="City">City</label>
            <input type="text" id="city" placeholder="Enter city" value={city} onChange={(e)=> setCity(e.target.value)} required/>
            
          </div>
          <div className="form-control">
            <label htmlFor="payment">Payment</label>
            <input type="text" id="payment"  value={payment} onChange={(e)=> setPayment(e.target.value)} required/>
            
          </div>
          <div className="form-control">
            <label htmlFor="Postal Code">Postal Code</label>
             <input type="tex" id="Postal-Code" placeholder="Enter Postal Code" value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} required/>
            
          </div>
          <div className="form-control">
            <label htmlFor="password2">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country} 
              onChange={(e)=> setCountry(e.target.value)}
               required
            />
            
          </div>
          <button type="submit"
          onClick={submitHandler}
          >Continue</button>
        </form>
      </div>
    </div>
    </>
  )
}
