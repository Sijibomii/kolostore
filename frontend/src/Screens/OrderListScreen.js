import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Spinner} from '../components/Spinner'
import { listMyOrders } from '../actions/orderActions'
import "./OrderListScreen.css"


export const OrderListScreen = ({history}) => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
  console.log(orders)
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(listMyOrders())
      } 
    }
  }, [dispatch, history, userInfo, user])
  return (
    <>
    {loadingOrders? (
      <div className="body" >
      <Spinner />
    </div>
    ): error ? (
      true
    ) :(
      <>
      <div className="container">
      <h1>Orders</h1>
      <div className="table">
        <table >
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>	
          {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                  <Link to={`/order/${order._id}`}>
                  <a href="" class="btn-detail">DETAILS</a>
                  </Link>
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
    </>
    )
  }
    </>
  )
}
