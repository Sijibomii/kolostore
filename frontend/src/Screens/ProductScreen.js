import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ProductScreen.css'
import { addToCart} from '../actions/cartActions'
import Rating from '../components/Rating'
import { Spinner } from '../components/Spinner'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
export const ProductScreen = ({ match }) => {
  const [qty, setQty] =useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const productsCollection = useSelector((state) => state.productCollection)
  const { loadingCol, errorCol, productsCol=[] } = productsCollection
  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, qty))
    let sum= 0
    cartItems.map((item) =>{
      sum= sum+ item.qty
    })
    document.getElementById('lblCartCount').innerText= sum+qty
  }
  
  const linkclick1 = () => {
    let click = document.getElementById('details')
    let sizing = document.getElementById('sizing')
    let shipping = document.getElementById('shipping')
    sizing.classList.add('d-none');
    shipping.classList.add('d-none');
    click.classList.toggle('d-none')
  }
  const linkclick2 = () => {
    let click = document.getElementById('sizing')
    let details = document.getElementById('details')
    let shipping = document.getElementById('shipping')
    details.classList.add('d-none');
    shipping.classList.add('d-none');
    click.classList.toggle('d-none')
  }
  const linkclick3 = () => {
    let click = document.getElementById('shipping')
    let details = document.getElementById('details')
    let sizing = document.getElementById('sizing')
    sizing.classList.add('d-none');
    details.classList.add('d-none');
    click.classList.toggle('d-none')
    
  }
  const linkclick4 = () => {
    
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
      <div className="main-product">
        <div className="container">
          <div className="main-product-image">
            <img src={product.image} alt=""/>
          </div>
          <div className="main-product-description">
            <div className="description-top">
              <h2>{product.name}</h2>
              <div className="color">{product.color}</div>
              <div className="price">
                <h4>$ <span>{product.price}</span></h4>
              </div>
              <div className="rating">
              <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
              </div>
              <div className="avalable-colors">
                <h3>{product.color}</h3>
                {product.countInStock > 0 && (
                  <>
                  <h4>Qty:</h4>
                  <select className='select'value={qty} onChange={(e)=> setQty(Number(e.target.value))}>
                    <option value="1"> 1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                  </select>
                  </>
                )}
                
                {/* <div className="col">
                  <div className="colorr-con active">
                    <div className="colorr"></div>
                  </div>
                  <div className="colorr-con ">
                    <div className="colorr"></div>
                  </div>
                  <div className="colorr-con ">
                    <div className="colorr"></div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className ="description-bottom">
              <button className="cart-button" onClick={addToCartHandler}>
              {product.countInStock === 0 ? 'Notify me when avalble' : 'Add to cart'}
              </button>
              
              <div className="shipping-info">
                <h4>Free shipping </h4>
              </div>
              <div className="product-details">
                {product.description}
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque animi deserunt corporis, quidem nihil rerum.
                </p>
                
              </div>
              <div className="details-link">
                <ul>
                  <li className="linkkk" id='details1' onClick={linkclick1}> Details</li>
                  <li className="linkkk" id='details1' onClick={linkclick2}> Sizing</li>
                  <li className="linkkk" id='details1' onClick={linkclick3}>Shipping</li>
                  <li className="linkkk" id='details1' onClick={linkclick4}>Reviews</li>
                </ul>

                <div className="d-details" id='details'>
                  <p>YesLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eligendi veniam ab accusamus natus sed praesentium minus ullam tempore totam adipisci voluptatibus minima corporis, quidem pariatur, voluptates commodi! 
                    Ipsa ullam dolor distinctio dolorum commodi id doloremque rerum veniam porro blanditiis.</p>
                </div>
                <div className="d-details d-none" id='sizing'>
                  <p>noLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eligendi veniam ab accusamus natus sed praesentium minus ullam tempore totam adipisci voluptatibus minima corporis, quidem pariatur, voluptates commodi! 
                    Ipsa ullam dolor distinctio dolorum commodi id doloremque rerum veniam porro blanditiis.</p>
                </div>
                <div className="d-details d-none" id='shipping'>
                  <p>shipLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eligendi veniam ab accusamus natus sed praesentium minus ullam tempore totam adipisci voluptatibus minima corporis, quidem pariatur, voluptates commodi! 
                    Ipsa ullam dolor distinctio dolorum commodi id doloremque rerum veniam porro blanditiis.</p>
                </div>
                <div className="d-details d-none" >
                  <p>YesLorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus eligendi veniam ab accusamus natus sed praesentium minus ullam tempore totam adipisci voluptatibus minima corporis, quidem pariatur, voluptates commodi! 
                    Ipsa ullam dolor distinctio dolorum commodi id doloremque rerum veniam porro blanditiis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    

     
        {/* <div className="like">
          <h2>You may also Like...</h2>
          <div className="products container grid">
            {productsCol.length!=0 &&(
              productsCol.map((product)=>(
                <Product product={product}/> )) )}
          </div>
        </div> */}
        <div className="reviews" id="reviews">
          <div className="container">
            <div className="written-reviews">
              <h1>REVIEWS</h1>
              {product.reviews.length === 0 && <h2>No Reviews</h2>}
              
                {product.reviews.map((review) => (

                   <div className="review" key={review._id}>
                   <h3><strong>{review.name}</strong></h3>
                   <Rating value={review.rating} />
                   {/* <span>
                     <i className="fas fa-star star"></i>
                     <i className="fas fa-star star"></i>
                     <i className="fas fa-star star"></i>
                     <i className="fas fa-star star"></i>
                     <i className="far fa-star star"></i>
                   </span> */}
                   <h4>{review.createdAt.substring(0, 10)}</h4>
                   <p>{review.comment}</p>
                 </div>
                ))}
                
                 
            </div>
            <div className="review-form">
            { userInfo ?(
                  
            <form action="#" className="form" onSubmit={submitHandler}>
                <h1>Write a Customer Review</h1>
                
              <div className="form-control">
                <label for="Rating">Rating</label>
                <select 
                 className="form-control"
                 value={rating}
                 onChange={(e) => setRating(e.target.value)}
                 >
                  <option value="">Select....</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
                
              </div>
              <div className="form-control">
                <label for="comment">comment</label>
                <textarea type="text" row="3" id="comment" placeholder="Comment"  value={comment}
                          onChange={(e) => setComment(e.target.value)}> </textarea>
                
              </div>
              <button type="submit">Submit</button>
            </form>
                  ):(
                    <h3>Sign In to write a review!</h3>
                  )}
              
            </div>
          </div>
        </div>
        </>
     )}
    </>
  )
}
