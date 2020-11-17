import axios from 'axios'
import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_QTY,
  CART_REDUCE_ITEM_QTY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let { data } = await axios.get(`/api/products/${id}`)
 
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCartItemQty = (id) => async (dispatch, getState) => {

   let cart =JSON.parse(localStorage.getItem('cartItems'))
   let product;
   cart.map((item)=>{
     if (item.product== id){
       product=item
   
     }
   })
   product.qty= product.qty -1
 
  dispatch({
    type: CART_REDUCE_ITEM_QTY,
    payload: {
      product: product.product,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: product.qty
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const addToCartItemQty = (id) => async (dispatch, getState) => {

   let cart =JSON.parse(localStorage.getItem('cartItems'))
   let product;
   cart.map((item)=>{
     if (item.product== id){
       product=item
     }
   })
   product.qty= product.qty +1
   console.log(product)
  dispatch({
    type: CART_ADD_ITEM_QTY,
    payload: {
      product: product.product,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: product.qty
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id) => (dispatch, getState) => {
  console.log('remove')
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
