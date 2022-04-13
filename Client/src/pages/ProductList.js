import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"
import Footer from "../components/Footer"
import "./ProductList.css"
import { Search } from '@material-ui/icons'



const ProductList = () => {
    return (
        <div className='productListContainer'>
            <Navbar />
            <Announcement />
            <h1 className='productListTitle'>Products</h1>
            <div className='productListFilterContainer'>
                <div className='productListFilter'>
                    <span className='productListFilterText'>Search</span>
                </div>
                <div className="prouctListFilter">
                    <span className="productListFilterText">Categories</span>
                </div>
            </div>

            <Products></Products>
            <Newsletter />
            <Footer />
        </div>
    )
}

export default ProductList