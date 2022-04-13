import axios from 'axios';
import React, { useEffect, useState } from 'react'
import authService from '../service/auth.service';
import "./UserProfile.css"

const UserProfile = () => {
    const initialValues = { addressLine1: "", addressLine2: "", city: "", pinCode: "", state: "", country: "INDIA" };
    const [address, setAddress] = useState(initialValues);
    const [addresses,setAddresses]=useState();
    const [s1, setS1] = useState({
        display: "flex"
    })
    const [s2, setS2] = useState({
        display: "none"
    })
    const [s3, setS3] = useState({
        display: "none"
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const showAddress = () => {
        setS1({
            display: "none"
        });
        setS2({
            display: "flex"
        });
        setS3({
            display: "none"
        });
    }
    const showProfile = () => {
        setS2({
            display: "none"
        });
        setS1({
            display: "flex"
        })
        setS3({
            display: "none"
        })
    }
    const showOrders = () => {
        setS2({
            display: "none"
        });
        setS1({
            display: "none"
        })
        setS3({
            display: "flex"
        })
    }
    const [order, setOrder] = useState([]);
    const user = authService.getCurrentUser();
    let a;
    if (user !== null) {
        a = user.token;
    }
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + a
        },
    };
    const [up, setUp] = useState([])
    const saveAddress = (e) => {
        e.preventDefault();
       
        axios.post("http://localhost:9090/eshop/address/add", address, header)
            .then(res => { alert("Adress is Added succesfully")})
            .catch(err => { })
    }

    const init = () => {
        axios.get("http://localhost:9090/eshop/order/customer/all", header).
            then(res => { setOrder(res.data.data) }).catch(err => { });
            axios.get("http://localhost:9090/eshop/address/all", header).
            then(res => { setAddresses(res.data.data) }).catch(err => { });

    }



    useEffect(() => {
        init();
    }, [])
    return (
        <>
            <div className='upContainer'>
                <div className='userAction'>
                    <button className='addressButton' onClick={showAddress}>NEW ADDRESS</button>
                    <button className='addressButton' onClick={showProfile}>USER PROFILE</button>
                    <button className='addressButton' onClick={showOrders}>ORDERS</button>
                </div>
                <div className='upWrapper' style={s1}>
                    <h1>USER PROFILE</h1>

                    <div className='upForm'>
                        <label className='l'>First Name</label>
                        <input className='upInput' type="text" value={user.data.firstName} readOnly/>
                        <label className='l'>Last Name</label>
                        <input className='upInput' type="text" value={user.data.lastName} readOnly/>
                        <label className='l'>Email ID</label>
                        <input className='upInput' type="text" value={user.data.email} readOnly/>
                        <label className='l'>Phone Number</label>
                        <input className='upInput' type="text" value={user.data.phoneNo} readOnly/>
                        
                        
                    </div>
                </div>
                <div className='upWrapper' style={s2}>
                    <h1>ADDRESS</h1>
                    <div className='upForm'>
                        <label className='l'>Address Line 1</label>
                        <input className='upInput' type="text" id="addressLine1" name='addressLine1'
                            value={address.addressLine1}
                            onChange={handleChange}
                        required />
                        <label className='l'>Address Line 2</label>
                        <input className='upInput' type="text" id="addressLine2" name='addressLine2'
                            value={address.addressLine2}
                            onChange={handleChange}
                            required/>
                        <label className='l'>City</label>
                        <input className='upInput' type="text" id="city" name='city'
                            value={address.city}
                            onChange={handleChange}
                            required/>
                        <label className='l'>State</label>
                        <input className='upInput' type="text" id="state" name='state'
                            value={address.state}
                            onChange={handleChange}
                            required/>
                        <label className='l'>PinCode</label>
                        <input className='upInput' type="text" id="pinCode" name='pinCode'
                            value={address.pinCode}
                            onChange={handleChange}
                            required/>
                        <button className='addressButton' onClick={saveAddress}>SAVE</button>
                    </div>
                </div>
                <div className='upWrapper' style={s3}>
                    <h1>ORDERS</h1>
                    <div className='upForm'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Order Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.map(order => (
                                        <tr key={order.id}>
                                            <td>Rs. {order.payment.amount}</td>                                            
                                            <td>{order.order.orderStatus}</td>
                                            <td>{order.orderDetails.map(
                                                d => (
                                                    <>
                                                        <td>{d.selectedProduct.name}</td>
                                                        <td>{d.quantity}</td>
                                                    </>
                                                )
                                            )}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile