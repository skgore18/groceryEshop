import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"
import axios from 'axios'



const Product = (product) => {
    const [myStyle, setMystyle] = useState({
        opacity: 0
    })
    const handleMouseover = () => {
        setMystyle({
            opacity: 1
        })
    }
    const mouseOut = () => {
        setMystyle({
            opacity: 0
        })
    }
    return (

        <div className="productContainer" onMouseOver={handleMouseover} onMouseOut={mouseOut}>
            <div className="productCircle" />
            <img className="productImage" src={product.imageName} />
            <div className="productInfo" style={myStyle}>
                <div className="productIcon">
                    <ShoppingCartOutlined />
                </div>
                <div className="productIcon">
                    <SearchOutlined />
                </div>
                <div className="productIcon">
                    <FavoriteBorderOutlined />
                </div>
            </div>
        </div>

    )
}

export default Product