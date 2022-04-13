import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import authService from '../service/auth.service';
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const user = authService.getCurrentUser();
  const role= user.role
  let a;
  if (user !== null) {
    a = user.token
  }
  const header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + a
    },
  };
  const [orders, setOrders] = useState([]);

  const baseURL = "http://localhost:9090/eshop/order"

  const getUsers = () => {
    axios.get(baseURL + "/all", header).then((response) => {
      setOrders(response.data.data)
      
    }).catch(error => { });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Link to="/adminDashboard"><HomeOutlined /></Link>
        <h1 className="adminProductListTitle">Order List</h1>
        <GetAppTwoTone onClick={getUsers} />
      </div>
      <table className='userTable'>
        <thead className='tableHeading'>
          <tr>
            <th className='userTableHeading'>Customer Name</th>
            <th className='userTableHeading'>Customer No</th>
            <th className='userTableHeading'>Address</th>
            <th className='userTableHeading'>Order Date</th>
            <th className='userTableHeading'>Payment Status</th>
            <th className='userTableHeading'>Price</th>
            <th className='userTableHeading'>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order => (
              <tr key={order.id} >
                <td className='rowContent'><div className="actionButtons"><h5> {order.order.customer.firstName} {order.order.customer.lastName}</h5></div></td>
                <td className='rowContent'><div className="actionButtons"><p> {order.order.customer.phoneNo} </p></div></td>
                <td className='rowContent'><div className="actionButtons">{order.order.deliveryAddress.addressLine1} {order.order.deliveryAddress.addressLine2}</div></td>
                <td className='rowContent'><div className="actionButtons">{order.order.orderDate.split("T")[0]} | {order.order.orderDate.split("T")[1].split(".")[0]}</div></td>
                <td className='rowContent'><div className="actionButtons"><h5>{order.payment.status}</h5></div></td>
                <td className='rowContent'><div className="actionButtons"><h5>{order.order.totalPrice}</h5></div></td>
                <td className='rowContent'><div className="actionButtons"><h5>{order.order.orderStatus}</h5></div></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default OrderList