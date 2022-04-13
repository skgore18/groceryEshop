import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import './Footer.css'




const Footer = () => {
    return (
        <div className='footerContainer'>
            <div className='footerLeft'>
                <h1>ESHOP</h1>
                <p className='footerDesc'>
                The web based “Online Grocery Store” project is an attempt to stimulate the basic concepts of Grocery Store. The 
system enables the customer to do the things such as search for Products category wise, choose products based on 
description and add that product into cart. 
                </p>
                <div className='socialContainer'>
                    <div className='socialIcon' color='#3B5999'>
                        <Facebook/>
                    </div>
                    <div className='socialIcon' color="#E4405F">
                        <Instagram/>
                    </div>
                    <div className='socialIcon' color="#55ACEE">
                        <Twitter/>
                    </div>
                </div>
            </div>
            <div className='footerCenter'>
                <div className='footerCenterTitle'></div>
                
            </div>
            <div className='footerRight'>
                <h1>Contact</h1>
                <div className="contactItem"><Room style={{marginRight:"10px"}}/>Plot No.162 Nr Ici School Turbhe, Pune, 400705, India</div>
                <div className="contactItem"><Phone style={{marginRight:"10px"}}/>+91 762 086 2482</div>
                <div className="contactItem"><MailOutline style={{marginRight:"10px"}}/>skgore18@gmail.com</div>
            </div>
        </div>
    )
}

export default Footer