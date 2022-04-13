import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import "./css/AdminProductList.css"
import { Link } from 'react-router-dom';
import authService from '../service/auth.service';
import { DeleteOutlined, EditOutlined } from '@material-ui/icons';
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';



const AdminProductList = () => {
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
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([]);
  const baseURL = "http://localhost:9090/eshop/product"
  const init = () => {
    axios.get(baseURL + "/show")
      .then((response) => {
        setProducts(response.data);
      }).catch(error => { });

    axios.get("http://localhost:9090/eshop/category/all", header)
      .then(res => {
        setCategories(res.data.data);
      }).catch(err => {
      })
  }


  const handleDelete = (id) => {
    axios.delete(baseURL + "/delete/" + id, header).then(() => {
      init();
    }).catch(error => {

    });
  }
  const handleCategory = (p) => {
    axios.get("http://localhost:9090/eshop/product/category/"+p,header).then(res=>{
      setProducts(res.data.data);
    })
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      
      <h2 className="adminProductListTitle">List of Product</h2>
      <Link to="/adminDashboard"><HomeOutlined /></Link>
      <button className="addButton"><Link className="linkButton" to="/createProduct">Add Product</Link></button>
  
      <div className='select-select'>
        {
          categories.map(category => (
             <div className="option" key={category.id} onClick={()=>handleCategory(category.name)}>{category.name}</div>
           ))
          }
          <div className="option" onClick={init}>All</div>
          </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td style={{ display: "grid", placeItems: "center" }}><img src={product.imageName} style={{ width: 50, height: 50 }} /></td>
                <td>{product.description}</td>
                <td>Rs. {product.price}</td>
                <td>{product.status}</td>
                <td>
                  <Link to={`/products/edit/${product.id}`}>
                    <EditOutlined style={{ marginRight: '40px', marginLeft: "40px" }} />
                  </Link>

                  <DeleteOutlined onClick={() => { handleDelete(product.id) }} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default AdminProductList