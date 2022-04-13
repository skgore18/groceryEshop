import React, { useEffect, useState } from 'react'
import axios from 'axios';
import authService from '../service/auth.service';
import "./Checkout.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CheckOut = () => {
    const initialValues = { addressLine1: "", addressLine2: "", city: "", pinCode: "", state: "", country: "INDIA" };
    const [address, setAddress] = useState([]);
    const [products, setProducts] = useState([]);
    const user = authService.getCurrentUser();
    const navigate = useNavigate();
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
    const init = () => {
        axios.get("http://localhost:9090/eshop/address/all", header).
            then(res => { setAddress(res.data.data) }).catch(err => { });
        axios.get("http://localhost:9090/eshop/cart/all", header).then(res=>
            setProducts(res.data.data))
    }
    useEffect(() => {
        init();
    }, []);
    const [isChecked, setIsChecked] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    const selectAddress = (addressId) => {
        setIsChecked(addressId);
        setMyStyle2("none")
    }
    const order = {
        addressId: isChecked,
        paymentMode: paymentMode
    }
    const placeOrder = () => {
        axios.post("http://localhost:9090/eshop/order/place", order, header).then(res => {
            navigate("/cart");
            window.location.reload();
            alert("Order placed Successfully")
        })

    }
    const [myStyle1, setMyStyle1] = useState("none")
    const handleDropDown1 = ()=> {
        if(myStyle1==="none"){
            setMyStyle1("block");
            setMyStyle2("none");
            setMyStyle3("none")
        } else setMyStyle1("none")
    }
    const [myStyle2, setMyStyle2] = useState("none")
    const handleDropDown2 = ()=> {
        if(myStyle2==="none"){
            setMyStyle2("block");
            setMyStyle1("none");
            setMyStyle3("none")
        } else setMyStyle2("none")
    }
    const [myStyle3, setMyStyle3] = useState("none")
    const handleDropDown3 = ()=> {
        if(myStyle3==="none"){
            setMyStyle3("block");
            setMyStyle1("none");
            setMyStyle2("none")
        } else setMyStyle3("none")
    }
    return (
        <>
        <Navbar/>
            <button className="accordion" onClick={handleDropDown1}>Order Summary</button>
            <div className="panel" style={{display:myStyle1}}>
            <div className="cartInfo">
                {
                    products.map(product=>(
                    
                        <div className="cartProduct" key={product.id}>
                            <div className="cartProductDetail">
                                <img className="cartImage" src={product.selectedProduct.imageName} />
                                <div className="cartDetails">
                                    <span><b>Product:</b> {product.selectedProduct.name}</span>
                                    <span><b>ID:</b> {product.selectedProduct.id}</span>
                                </div>
                            </div>
                            <div className="cartPriceDetail">
                                <div className="cartProductAmountContainer">
                                    <div className="cartProductAmount">Quantity: {product.quantity}</div>
                                </div>
                                <div className="cartProductPrice">Rs. {product.selectedProduct.price}</div>
                            </div>
                        </div>
                    
                    ))}
                    </div>
            </div>

            <button className="accordion" onClick={handleDropDown2}>Delivery Address</button>
            <div className="panel" style={{display:myStyle2}}>
                <div>
                    {
                        address.map(address=>(
                            <div key={address.id}>
                                <span style={{fontSize:"20px"}}>{address.addressLine1}, {address.addressLine2},<br/>{address.city},{address.state}</span><br/>
                                <span style={{fontSize:"20px"}}>{address.country}, {address.pinCode}</span><br/>
                                <button className='addButton' onClick={()=>selectAddress(address.id)}>Deliver Here</button>
                            </div>
                        ))
                    }
                </div>
                <Link to="userProfile">
                <button className='paymentButton'>Add New Address</button>
                </Link>
                
            </div>

            <button className="accordion" onClick={handleDropDown3}>Payment Options</button>
            <div className="panel" style={{display:myStyle3}}>
                <button className='paymentButton' onClick={()=>setPaymentMode("COD")}>Cash On Delivery</button>
            </div>
            <button className='place' onClick={()=>placeOrder()}>Place Order</button>
        </>
    )
}

export default CheckOut