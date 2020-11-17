import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner} from '../components/Spinner'
 import {
   listProducts,
  deleteProduct,
   createProduct,
 } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import "./ProductListScreen.css"
export const ProductListScreen = ({ history, match }) => {
  // const pageNumber = match.params.pageNumber || 1

   const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products} = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

   useEffect(() => {
    dispatch(listProducts())
     dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      
    }
 }, [ dispatch,
  history,
  userInfo,
  successDelete,
  successCreate,
  createdProduct,])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <>
    {loading ? 
      (<div className="body" >
        <Spinner />
      </div>):
      (
    
    <>
      <div className="container">
      <h1>Products List</h1>
      <Link onClick={createProductHandler} className="btn">Create a product</Link>
      { loadingDelete && (<div className="body" >
        <Spinner />
      </div>)}
      { loadingCreate && (<div className="body" >
        <Spinner />
      </div>)}
      <div className="table">
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Collection</th>
            <th>Category</th>
            <th>Color</th>
            <th></th>
          </tr>
          
          {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.collections}</td>
                  <td>{product.category}</td>
                  <td>{product.color}</td>
                  <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                      <i className='fas fa-edit'></i>
                  </Link>
                  <a href="#"
                  onClick={() => deleteHandler(product._id)}
                  ><i className="fas fa-trash red"></i></a>
                </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
    </>
    )}
    </>
  )
    
}

export default ProductListScreen
