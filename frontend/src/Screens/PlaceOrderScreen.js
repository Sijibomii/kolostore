import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import './PlaceOrder.css'
export const PlaceOrderScreen = ({history}) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  
  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    else{
      if (error){
        alert(error)
      }
    }
    // eslint-disable-next-line
  }, [history, success])
  const submitHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)
  return (
    <>
      <div className="placeorder">
      <div className="container">
        <div className="order-con">
          <div className="shipping-details">
            <div className="header">
              <h1>SHIPPING</h1>
              <h4>Address:{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}</h4>
            </div>
            <div className="center">
              <h1>PAYMENT</h1>
              <h4>Method: {cart.paymentMethod}</h4>
            </div>
            <div className="below">
              <h1>ORDER ITEMS</h1>
              { cart.cartItems.length === 0 ? (
                <h2>Your Cart is empty!</h2>
              ):(
                <>
                 {cart.cartItems.map((item, index) => (
                  <div className="item">
                    <img src={item.image} alt={item.name}/>
                      <h3>{item.name}</h3>
                    <h4> {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</h4>
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
              <h4>${cart.itemsPrice}</h4>
            </div>
            <div className="order-row">
              <h4>Shipping</h4>
              <h4>$ ${cart.shippingPrice}</h4>
            </div>
            <div className="order-row">
              <h4>Tax</h4>
              <h4>${cart.taxPrice}</h4>
            </div>
            <div className="order-row">
              <h4>Total</h4>
              <h4>${cart.totalPrice}</h4>
            </div>
            <a href="#" className="btn" onClick={submitHandler}>Place Order</a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
