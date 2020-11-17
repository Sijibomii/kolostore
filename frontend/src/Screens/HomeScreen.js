import React, {useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import "./Home.css"
import { Product } from '../components/Product'
import {listProducts} from '../actions/productActions'
import { Spinner } from '../components/Spinner'
export const HomeScreen = () => {
  const dispatch =useDispatch()
  const productList= useSelector(state=> state.productList)
  const { loading , error, products}=productList
  useEffect(()=>{
    dispatch(listProducts())

  }, [dispatch])
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
      <div className="showcase" ></div>
    <div className="bred-crumb">
      <div className="container">
        <ul className="ul">
          <li><a href="#" className="bred-active">New Arrivals</a></li>
          <li><a href="#">Best Sellers</a></li>
          <li><a href="#">Clothing</a></li>
          <li><a href="#">Shoes</a></li>
        </ul>
      </div>
    </div>
  
    <div className="products container grid">
      {products.map((product)=>(
        <Product product={product}/>
      )
      )}
     
    </div>
    </>
      )}
    </>
  )
}
