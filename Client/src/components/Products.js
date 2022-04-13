import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Products.css"
import "./Product.css"
import axios from 'axios';
import { useEffect } from 'react';
import { FavoriteBorderOutlined, Search, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'



const Products = () => {
  const [products, setProducts] = useState([]);
  const baseURL = "http://localhost:9090/eshop/product/show"
  const init = () => {
    axios.get(baseURL).then((res) => {
      setProducts(res.data);
    }).catch(error => { });
  }

  useEffect(() => {
    init();
  }, []);
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
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="navbarSearchContainer">
        <input className="navbarInput"
          placeholder="Search"
          onChange={e => setQuery(e.target.value)}
          style={{ width: '100%' }} />
        <Search style={{ color: 'gray', fontSize: 16 }} />
      </div>
      <Link to="/products">
        <div className='pContainer'>


          {
            products.filter(product=>product.name.toLowerCase().includes(query)).map(product => (
              <div key={product.id}>

                <div className="productContainer" onMouseOver={handleMouseover} onMouseOut={mouseOut}>
                  <div className="productCircle" />
                  <img className="productImage" src={product.imageName} />
                  <div className="productInfo" style={myStyle}>
                    <div className="productNameSection"><div>{product.name}</div>
                      <div>Rs. {product.price}</div>
                    </div>
                    <div className="productIcon">
                      <ShoppingCartOutlined />
                    </div>
                    <div className="productIcon">
                      <Link to={`/product/detail/${product.id}`}>
                        <SearchOutlined />
                      </Link>
                    </div>
                    <div className="productIcon">
                      <FavoriteBorderOutlined />
                    </div>
                  </div>
                </div>

              </div>
            ))
          }



        </div>
      </Link>
    </>
  )
}

export default Products