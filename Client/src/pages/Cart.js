import React, { useEffect } from 'react'
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import styled from 'styled-components'
import { Add, HighlightOff, Remove } from '@material-ui/icons'
import "./Cart.css"
import { useState } from 'react'
import authService from '../service/auth.service'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const TopButton = styled.button`
padding : 10px;
font-weight : 600;
cursor : pointer;
border : ${props => props.type === "filled" && "none"};
background-color : ${props => props.type === "filled" ? "black" : "transparent"};
color : ${props => props.type === "filled" && "white"};
`;

const ProductColor = styled.div`
width : 20px;
height : 20px;
border-radius : 50%;
background-color : ${props => props.color};
`;

const SummaryItem = styled.div`
margin : 30px 0px;
display : flex;
justify-content : space-between;
font-weight : ${props => props.type === "total" && "500"};
font-size : ${props => props.type === "total" && "24px"};
`;

const Cart = () => {
    const [products, setProducts] = useState([]);
    const user = authService.getCurrentUser();
    const navigate = useNavigate();
    

    
    
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
    let totalPrice = 0;
    if (user){
        for (let i =0; i < products.length; i++){
            totalPrice += products[i].selectedProduct.price * products[i].quantity;
        }
        console.log(totalPrice);
    }
    
    const showCart = () => { axios.get("http://localhost:9090/eshop/cart/all", header).then((response) => {
            setProducts(response.data.data);
        }).catch(error => {});
    }
    const handleDelete = (id) => {
        axios.delete("http://localhost:9090/eshop/cart/delete/"+id, header).then(res=>{
            window.location.reload();
        })
    }
    const deleteAll = () => {
        axios.delete("http://localhost:9090/eshop/cart/delete/all", header).then(res=>{
            window.location.reload();
        })
    }
    const navTo = () => {
        if(products.length===0){
            navigate("/");
            alert("No Products In Cart")   
        }
        else{
        navigate("/checkoutPage");
        }
    }
    useEffect(()=>{
        showCart();
    }, [])
    console.log(products);
    return (

        <div className='cartContainer'>
            <Navbar />
            <Announcement />
            <Link to="/"><HomeOutlined/></Link>
            <div className="cartWrapper">
                <h1 className="cartTitle">YOUR BAG</h1>
                <div className="cartTop">
                    <TopButton>CONTINUE SHOPPING</TopButton>
                    <div>
                        <span className="cartTopText">Shopping Bag({products.length})</span>
                        <span className="cartTopText" onClick={()=>{
                            deleteAll();
                        }}>Clear Cart</span>
                    </div>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </div>
                <div className="cartBottom">
                <div className="cartInfo">
                {
                    products.map(product=>(
                    
                        <div className="cartProduct" key={product.id}>
                            <div onClick={()=>{handleDelete(product.id)}}><HighlightOff /></div>
                            <div className="cartProductDetail">
                                <img className="cartImage" src={product.selectedProduct.imageName} />
                                <div className="cartDetails">
                                    <span><b>Product:</b> {product.selectedProduct.name}</span>
                                    <span><b>ID:</b> {product.selectedProduct.id}</span>
                                </div>
                            </div>
                            <div className="cartPriceDetail">
                                <div className="cartProductAmountContainer">
                                    <Add item="add" />
                                    <div className="cartProductAmount">{product.quantity}</div>
                                    <Remove item="remove" />
                                </div>
                                <div className="cartProductPrice">Rs. {product.selectedProduct.price}</div>
                            </div>
                        </div>
                    
                    ))}
                    </div>
                    <div className="cartSummary">
                        <h1 className="cartSummaryTitle">ORDER SUMMARY</h1>
                        <SummaryItem>
                            <span>Subtotal</span>
                            <span>Rs.{totalPrice}</span>
                        </SummaryItem>
                        <SummaryItem>
                            <span>Estimated Shipping</span>
                            <span>Rs. 25</span>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <span>Total</span>
                            <span>Rs. {totalPrice + 25}</span>
                        </SummaryItem>
                        <button className="cartSummaryButton" onClick={navTo}>CHECKOUT NOW</button>
                    </div>
                </div>
                
            </div>
            <Footer />
        </div>

    )
}

export default Cart