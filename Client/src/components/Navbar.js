import React, { useEffect, useState } from 'react';
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Navbar.css'
import authService from '../service/auth.service';
import axios from 'axios';



const Navbar = () => {
    const user = authService.getCurrentUser();
    const [q , setQ] = useState(0);
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
    
    useEffect(()=>{
        if(user){
            axios.get("http://localhost:9090/eshop/cart/all", header).then(res=>{
                setQ(res.data.data.length);
            })
        }
    },[])
    const handleLogout = () => {
        authService.logout();
        window.location.reload();
    }

    return (
        <div className="navbarContainer">
            <div className="navbarWrapper">
                <div className="navbarLeft">
                    <span className="navbarLanguage">EN</span>
                </div>
                <div className='navbarCenter'>
                    <Link to="/"><h1 className="navbarLogo">
                      GROCERY E-SHOP
                    </h1></Link>
                </div>
                <div className="navbarRight">

                    <div className="navbarMenuItems" style={user ? {display:"none"}:{display:"block"}}><Link to="/register">Register</Link></div>
                    <div className="navbarMenuItems" style={user ? {display:"none"}:{display:"block"}}><Link to="/login">Sign In</Link></div>
                    <div className="navbarMenuItems" style={user ? {display:"block"}:{display:"none"}}><Link to="/userProfile">{user ? user.data.firstName : ""}</Link></div>
                    <div className="navbarMenuItems"  
                        onClick={handleLogout} style={user ? {display:"block"}:{display:"none"}}>LogOut</div>
                    <Badge badgeContent={q} color='primary'>
                        <Link to="/cart">
                            <ShoppingCartOutlined />
                        </Link>
                    </Badge>
                </div>
            </div>
        </div>

    )
}

export default Navbar