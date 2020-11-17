import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Spinner } from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  getOrderDetails,
  payOrder,
  deliverOrder
} from '../actions/orderActions'
import CurrencyFormat from "react-currency-format";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'
import "./OrderScreen.css"
export const OrderScreen = ({match, history}) => {

  const orderId = match.params.id
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()
  const [errorr, setErrorr] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const  orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);
  
  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  useEffect(() => {
    
    if (!userInfo) {
      history.push('/login')
    }
    
    if (!order) {
      dispatch(getOrderDetails(orderId))
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
    } 
    
     // generate the special stripe secret which allows us to charge a customer
     
  if (order && !loading){
    //dispatch a new action
    
    getClientSecret(); 
  }
  
  }, [dispatch, orderId, successPay, order,successDeliver])

const getClientSecret = async () => {
  try{
    const send= {
      "total": (Math.round(order.totalPrice) * 100),
    }
   console.log()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    
    const { data } = await axios.post(`/api/orders/pay/${orderId}`, send, config)
    setClientSecret(data.clientSecret)
    console.log(data.clientSecret)
  }catch(error){
    console.log(error)
  }
   
}   
const deliverHandler = () => {
  dispatch(deliverOrder(order))
  window.location.href = window.location.href;
}
const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
          card: elements.getElement(CardElement)
      }
  })
      // paymentIntent = payment confirmation
      
      setSucceeded(true);
      setErrorr(null)
      setProcessing(false)
      const {paymentIntent}= payload
      if (paymentIntent.status==='succeeded'){
        dispatch(payOrder(order._id,{
          id: paymentIntent.id,
          status: paymentIntent.status,
          email_address: userInfo.email
        }))
          localStorage.removeItem('cartItems')
          localStorage.removeItem('shippingAddress')
          localStorage.removeItem('paymentMethod')
          document.getElementById('lblCartCount').innerText= 0
         history.replace('/myorders')//change to order screen after created
      }
     
     

}

const handleChange = event => {
  // Listen for changes in the CardElement
  // and display any errors as the customer types their card details
  setDisabled(event.empty);
  setErrorr(event.errorr ? event.errorr.message : "");
}

  return (
    <>
    {loading ? (
      <div className="body" >
        <Spinner />
      </div>
        
      ) : error ? (
        true
      ) : (
        <>
    <div className="placeorder">
      <div className="container">
        <div className="order-con">
          
          <div className="shipping-details">
            <h3>ORDER {order._id}</h3>
            <div className="header">
              <h1>SHIPPING</h1>
              <h4>Name: {order.user.name}</h4>
              <h4>Email: {' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a></h4>
              <h4>Address: {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}</h4>
                {order.isDelivered ? (
                <div className= "alert alert-success fade">
                 Delivered on {order.deliveredAt}
                </div>
              ) : (
                <div className= "alert alert-danger fade">
                Not Delivered
                </div>
              )}
            </div>
            <div className="center">
              <h1>PAYMENT</h1>
              <h4>Method: {order.paymentMethod}</h4>
              {order.isPaid ? (
                <div className= "alert alert-success fade">
                 Paid
                </div>
              ) : (
                <div className= "alert alert-danger fade">
                Not Paid
                </div>
              )}
              
            </div>
            <div className="below">
              <h1>ORDER ITEMS</h1>
              {order.orderItems.length === 0 ? (
                <h2>Order is Empty</h2>
              ) : (
                <>
                {order.orderItems.map((item, index) => (
                  <div className="item">
                  <img src={item.image} alt={item.name}/>
                  <Link to={`/product/${item.product}`}>
                           <h3>{item.name}</h3> 
                  </Link>
                  <h4>{item.qty} x ${item.price} = ${item.qty * item.price}</h4>
                </div>
                ))} 
                </>
              )}
            </div>
          </div>
          <div className="order-summary">
            <h2>ORDER SUMMARY</h2>
            <div className="order-row">
              <h4>Items</h4>
              <h4>$ {order.itemsPrice}</h4>
            </div>
            <div className="order-row">
              <h4>Shipping</h4>
              <h4>${order.shippingPrice}</h4>
            </div>
            <div className="order-row">
              <h4>Tax</h4>
              <h4>${order.taxPrice}</h4>
            </div>
            <div className="order-row">
              <h4>Total</h4>
              <h4>${order.totalPrice}</h4>
            </div>
            {/* <a href="" className="btn">Make Payment</a> */}
            {!order.isPaid &&(
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
                <div classNameName='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={order.totalPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                                    />
              <button className="btn" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Make Payment"}</span>
              </button>                
                </div>
                {/* Errors */}
                {error && <div>{error}</div>}
            </form>
            )}
            {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  
                    <button
                      type='button'
                      className='btn'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  
                )}
          </div>
        </div>
      </div>
    </div>
        </>
      )}
    </>
  
  )
}
