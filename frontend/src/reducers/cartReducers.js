import {
  CART_ADD_ITEM,
  CART_REDUCE_ITEM_QTY,
  CART_ADD_ITEM_QTY,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let item = action.payload
      const newCart= state.cartItems.filter((x) => x.product !== item.product)
      let productAlreadyInCart = false;
    const existItem = state.cartItems.find((x) => x.product === item.product)
    if(existItem){
      productAlreadyInCart = true;
      let { product,
        name,
        image,
        price,
        countInStock,
        qty}= existItem
      qty =qty + 1
      
      newCart.push({ product, name,image,price,countInStock, qty});
      localStorage.setItem('cartItems', JSON.stringify(newCart))
    }
   
      if (productAlreadyInCart){
        return {
          ...state,
          cartItems: newCart
        }
      }else{
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case CART_REDUCE_ITEM_QTY:
      let cartItem= action.payload
      const newCartt= state.cartItems
      newCartt.map((item)=>{
        if (item.product== cartItem.product){
          item.qty=item.qty -1
        }
      })
      
       localStorage.setItem('cartItems', JSON.stringify(newCartt))
      
       return{
         ...state,
         cartItems: newCartt
       }
      case CART_ADD_ITEM_QTY:
        let cartItemm= action.payload
        const newCarttt= state.cartItems
        //newCarttt.push({...cartItemm})
        newCarttt.map((item)=>{
          if (item.product== cartItemm.product){
            item.qty=item.qty +1
          }
        })
        localStorage.setItem('cartItems', JSON.stringify(newCarttt))
        return{
          ...state,
          cartItems: newCarttt
        }
      case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      }
      case CART_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload,
        }
      case CART_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload,
        }
    default:
      return state
  }
}