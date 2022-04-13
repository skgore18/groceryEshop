import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';

const DeliveryorderScreen = () => {
    const [orders, setOrders] = useState([]);
    const [ms, setMs] = useState("placed");
    const user = authService.getCurrentUser();
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
    const navigate = useNavigate();
    const init = () => {
        axios.get("http://localhost:9090/eshop/order/all", header).then(res => {
            console.log(res.data.data);
            setOrders(res.data.data);
        }).catch((err) => { });
    };
    const url_assign_order = "http://localhost:9090/eshop/order/update";
    const onAssign = (orderId) => {
        axios.patch(url_assign_order, { orderId }, header)
            .then(response => {
                setOrders(response.data.data.filter(item => item.order.orderStatus === "READY"));
                
            })
            .catch(error => {
            })
            window.location.reload();
    }
    useEffect(() => {
        init();
    }, []);
    const changeStatus = (orderId) => {
        axios.patch("http://localhost:9090/eshop/order/update-status", { orderId: orderId, status:"DELIVERED"}, header).then(res=>{
            window.location.reload();
        })
    }
    return (
        <>
            <button className='addButton' onClick={() => {
                authService.logout();
                navigate("/login");
                window.location.reload();
            }}>Logout</button>
            <button className='addButton' onClick={()=>setMs("out_for_delivery")}>Assigned</button>
            <button className='addButton' onClick={()=>setMs("placed")}>ALL</button>
            <button className='addButton' onClick={()=>setMs("delivered")}>Delivered</button>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Amount</th>
                        <th>Address</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                {/* products.filter(product=>product.name.toLowerCase().includes(query)) */}
                    {
                        orders.filter(order=>order.order.orderStatus.toLowerCase().includes(ms)).map(order => (
                            <tr key={order.order.id}>
                                <td>{order.order.customer.firstName}</td>
                                <td>Rs. {order.payment.amount}</td>
                                <td>{order.order.deliveryAddress.addressLine1}, {order.order.deliveryAddress.addressLine2}</td>
                                <td>{order.payment.status}</td>
                                <td>{order.order.orderStatus}</td>
                                <td>{order.order.orderDate}</td>
                                <td><button className="addButton" onClick={() => { onAssign(order.order.id) }}>Assign to self</button>
                                <button className="addButton" onClick={() => { changeStatus(order.order.id) }}>Delivered</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default DeliveryorderScreen
