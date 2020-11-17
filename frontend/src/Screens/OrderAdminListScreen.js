import React,{ useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Spinner} from '../components/Spinner'
import { listOrders } from '../actions/orderActions'
import "./OrderAdminListScreen.css"

export const OrderAdminListScreen = ({history}) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <>
    {loading? (
      <div className="body" >
      <Spinner />
    </div>
    ): error ? (
      true
    ) :(
      <>
      <div className="container">
      <h1>ALL Orders</h1>
      <div className="table">
        <table >
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>User</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>	
          {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.user && order.user.name}</td>
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
