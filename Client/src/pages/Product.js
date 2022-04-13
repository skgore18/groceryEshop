import React from "react";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { useState, useEffect } from 'react';
import "./ProductPage.css"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Add, Remove } from "@material-ui/icons";
import authService from "../service/auth.service";
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';



const Product = () => {
  const initialValues = {
    name: "", description: "",
    imageName: "", status: "",
    selectedCategory: "", price: "", unit: "", quantity: "", productId: ""
  }
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const baseURL = "http://localhost:9090/eshop/product";
  const [formValues, setFormValues] = useState(initialValues);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios.get(`${baseURL}/detail/${id}`)
        .then(response => {
          const arr = {
            selectedCategory: response.data.data.category,
            name: response.data.data.product.name,
            description: response.data.data.product.description,
            imageName: response.data.data.product.imageName,
            status: response.data.data.product.status,
            price: response.data.data.product.price,
            unit: response.data.data.stock.unit,
            quantity: response.data.data.stock.quantity,
            productId: response.data.data.product.id
          };
          setFormValues(arr);
          setProduct(arr);
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
    }
  }, []);
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
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
  const addToCart = () => {
    if (user){
      const cart = { productId: formValues.productId, quantity: quantity }
    const d = JSON.stringify(cart);
    axios.post("http://localhost:9090/eshop/cart/add", d, header).
      then(res => {
        window.location.reload();
      })
    } else {
      navigate("/login")
    }

    
  }
  return (
    <div>
      <Navbar />
      <Announcement />
      <Link to="/"><HomeOutlined/></Link>
      <div className="productPageWrapper">
        <div className="productPageImageContainer">
          <img className="productPageImage" src={formValues.imageName} />
        </div>
        <div className="productPageInfoContainer">
          <h1 className="productPageTitle">{formValues.name}</h1>
          <p className="productPageDesc">
            {formValues.description}
          </p>
          <span className="productPagePrice">Rs. {formValues.price}</span>
          <div className="productPageAddContainer">
            <Remove onClick={() => handleQuantity("dec")} />
            <span>{quantity}</span>
            <Add onClick={() => handleQuantity("inc")} />
            <button className="productPageButton" onClick={addToCart}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Product;
