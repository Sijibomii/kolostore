import React,{useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {removeFromCartItemQty, addToCartItemQty, removeFromCart} from '../actions/cartActions'
import { Link } from 'react-router-dom'
import "./CartScreen.css"
export const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  function decrease(id) {
    //dispatch the decrease action here
    dispatch(removeFromCartItemQty(id))
    
    let sum= 0
    let subtotal=0
    cartItems.map((item) =>{
      sum= sum+ item.qty
      subtotal= subtotal + (item.price* item.qty)
    })
    document.getElementById('lblCartCount').innerText= sum
    document.getElementById('subtotal').innerText= subtotal
    cartItems.map((item) =>{
      if (item.qty == 0){
        deleteFromCart(item.product)
      }
    })
  }
  function deleteFromCart(id){
    
    dispatch(removeFromCart(id))
  }
  function increase(id) {
    //dispatch the decrease action here
    dispatch(addToCartItemQty(id))
    let sum= 0
    let subtotal=0
    cartItems.map((item) =>{
      sum= sum+ item.qty
      subtotal= (subtotal + (item.price* item.qty)).toFixed(2)
    })
    document.getElementById('lblCartCount').innerText= sum
    document.getElementById('subtotal').innerText= subtotal
  }
  
  useEffect(() => {
    let subtotal=0
    cartItems.map((item) =>{
      subtotal= subtotal + (item.price* item.qty)
    })
    document.getElementById('subtotal').innerText= subtotal
  }, [])

  return (
    <>
      <div className="cart-con">
    <div className="container">
      <div className="cart-head">
        <h1>Your Cart</h1> 
      </div>
      {cartItems.length === 0 ? (
        <h2>Your cart is empty</h2>
      ):(
        <div className="order-items">
         {cartItems.map((item) => (
           <div className="order-item" key={item.product}>
           <div className="order-item-img">
             <img src={item.image} alt={item.name} />
           </div>
           <div className="order-item-name">
           <Link to={`/product/${item.product}`}><h3>{item.name}</h3></Link> 
           </div>
           <div className="order-item-qty" >
             <input type="button" value="-" onClick={()=>{
               decrease(item.product)
             }} 
            />
             <input type="text" name="" id="" value={item.qty} />
             <input type="button" value="+" onClick={()=>{ increase(item.product)} }
            />
           </div>
           <div className="order-item-price">
             <span>$<h4>{(item.price * item.qty).toFixed(2)}</h4></span>
           </div>
         </div>
         ))}
        </div>
      )}
        <div className="order-items-bottom">
          <div className="subtotal">
            <h1>Subtotal</h1>
            <span>$ <h3 id="subtotal">0.00</h3></span>
          </div>
          <a href="#" onClick={checkoutHandler}>Checkout</a>
        </div>
    </div>
  </div>
    </>
  )
}
