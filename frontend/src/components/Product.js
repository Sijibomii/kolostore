import React from 'react'
import "./Product.css"
import { Link } from "react-router-dom";
export const Product = ({ product }) => {
  return (
    <>
      <div className="product">
        <Link to={`/product/${product._id}`}>
          <div className="product-image">
          <img src={product.image} alt=""/>
          </div>
        </Link>
        <div className="product-text">
          <h4>{product.name }</h4>
          <h5>$ <span>{product.price }</span></h5>
        </div>
      </div>
      
    </>
  )
}
