import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer,
  productDetailsReducer,
  productCollectionReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
productReviewCreateReducer } from './reducers/productReducers'
import {cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, 
  orderDetailsReducer,
   orderPayReducer,
   orderListMyReducer,
   orderDeliverReducer, 
   orderListReducer} from './reducers/orderReducers'
import {userLoginReducer,
   userRegisterReducer, 
   userDetailsReducer,
   userUpdateProfileReducer, 
   userListReducer,
    userDeleteReducer, 
    userUpdateReducer} from './reducers/userReducers'
const reducer = combineReducers({
  productList: productListReducer, 
  productDetails: productDetailsReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  productCollection: productCollectionReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
})
const middleware = [thunk]
const cartItemsFromStorage=localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const initialState={
  cart : { cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {userInfo:userInfoFromStorage},
}
const store= createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store