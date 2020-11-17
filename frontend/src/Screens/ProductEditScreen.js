import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Spinner } from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

import './ProductEditScreen.css'
export const ProductEditScreen = ({match, history}) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [color , setColor]=useState('')
  const [collections, setCollections]=useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setColor(product.color)
        setCollections(product.collections)
        setCategory(product.category)
        setCountInStock(product.countInSock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        color,
        collections,
        category,
        description,
        countInStock,
      })
    )
  }
  return (
    <>
      <div className="container">
    <form id="form" className="form" onSubmit={submitHandler}>
      {loading? <Spinner /> :(
        <>
      <h2>Product Edit Screen </h2>
      { loadingUpdate && (
        <div className='body'>
          <Spinner />
        </div>
      )}
      <div className="form-control">
        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" placeholder="Enter Name"  name="name" value={name} onChange={(e)=> setName(e.target.value)}/>
      </div>
      <div className="form-control">
        <label htmlFor="price">Price</label>
        <input type="text" id="price" name="price" placeholder="Enter price" value={price} onChange={(e)=> setPrice(e.target.value)} />
      </div>
      {/* image here */}
      <div className="form-control">
        <label htmlFor="image">image</label>
        <input type="text" id="image" name="image" placeholder="Enter image" value={image} onChange={(e)=> setImage(e.target.value)} />
        <input type="file" id="myfile" name="myfile" onChange={uploadFileHandler}/>
        { uploading && (
           <div className='body'>
           <Spinner />
         </div>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="brand">Brand</label>
        <input type="text" id="brand" name="brand" placeholder="Enter brand" value={brand} onChange={(e)=> setBrand(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" placeholder="Enter category" value={category} onChange={(e)=> setCategory(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="countInStock">CountInStock</label>
        <input type="text" id="countInStock" name="countInStock" placeholder="Enter countInStock" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="color">Color</label>
        <input type="text" id="color" name="color" placeholder="Enter color" value={color} onChange={(e)=> setColor(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="collections">Collections</label>
        <input type="text" id="collections" name="collections" placeholder="Enter collections" value={collections} onChange={(e)=> setCollections(e.target.value)} />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" placeholder="Enter description" value={description} onChange={(e)=> setDescription(e.target.value)} />
      </div>
      
      <button type="submit">Submit</button>
      </>
      )}
    </form>
  </div>
    </>
  )
}
