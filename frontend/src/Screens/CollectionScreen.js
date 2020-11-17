import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CollectionScreen.css'
import { Product } from '../components/Product'
import { Spinner} from '../components/Spinner'
import {
  listProductByCollection,
  listProductByCollectionAndCategory,
  listProductByCollectionAndCol
} from '../actions/productActions'
export const CollectionScreen = ({match}) => {
  const dispatch = useDispatch()
  const productsCollection = useSelector((state) => state.productCollection)
  const { loading, error, products } = productsCollection
  useEffect(() => {
    dispatch(listProductByCollection(match.params.collections))
  }, [dispatch, match])
  function collectionByCategory(category){
    // dispatch(listProductByCollectionAndCategory(match.params.collections,'shoes'))
    if(category ==='all'){
      dispatch(listProductByCollection(match.params.collections))
    }else{
      dispatch(listProductByCollectionAndCategory(match.params.collections,category))
    }
  }
  function collectionByColor(color){
    dispatch(listProductByCollectionAndCol(match.params.collections, color))
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
     <div class="showcase collection"></div>
    
    <div class="collection-container">
      <div class="collection-list">
        <ul>
          <li onClick={()=> {collectionByCategory('all')}}> ALL</li>
          <li onClick={()=> {collectionByCategory('tees')}}>Tees</li>
          <li onClick={()=> {collectionByCategory('crewnecks')}}>Crewnecks</li>
          <li onClick={()=> {collectionByCategory('hats')}}>Hats</li>
          <li onClick={()=> {collectionByCategory('shoes')}}>Shoes</li>
        </ul>
      </div>
      <div class="collection-product">
        <div class="heading">
          <ul>
            <li >
              <h4> Filters:</h4>
            </li>
            <li class="dropdown">
              <h4> Colors <i class="fas fa-caret-down"></i>
              </h4>
              <div class="dropdown-content">
                <li><a href="javascript:void(0)" onClick={()=> {collectionByColor('black')}}>Black</a></li>
                <li><a href="javascript:void(0)" onClick={()=> {collectionByColor('white')}}>White</a></li>
                <li><a href="javascript:void(0)" onClick={()=> {collectionByColor('brown')}}>Brown</a></li>
              </div>
            </li>
            {/* <li class="dropdown"><h4>Sizes<i class="fas fa-caret-down"></i></h4> 
              <div class="dropdown-content">
                <a href="#">XS</a>
                <a href="#">S</a>
                <a href="#">M</a>
                <a href="#">L</a>
                <a href="#">XL</a>
                <a href="#">XXL</a>
              </div>
            </li> */}
          </ul>
        </div>
        <div class="products container grid collection">
          {products.length == 0 &&(
            <h2>No Products avalable for this category</h2>
          )}
            {products.map((product)=>(
              <Product product={product}/>
                )
                )}
          
        </div>
      </div>
    </div>
    </>)}
    </>
    
  )
}
