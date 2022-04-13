import React from 'react'
import "./AddProduct.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';


const AddProduct = () => {

    const header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : sessionStorage.getItem("Authorization")
        },
    };
    
    const initialValues = {
        name: "", description: "",
        imageName: "", status: "",
        selectedCategory: "", price: "", unit : "", quantity : ""
    }
    const [formValues, setFormValues] = useState(initialValues);
    const navigate = useNavigate();
    const { id } = useParams();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const baseURL = "http://localhost:8080/eshop/product";

    const handleSubmit = (e) => {
        const productDTO ={
            product : {
                name : formValues.name,
                description : formValues.description,
                price : formValues.price,
                status : formValues.status,
                imageName : formValues.imageName
            },
            category : formValues.selectedCategory,
            stock : {
                quantity : formValues.quantity,
                unit : formValues.unit
            }
        }
        const formData = new FormData()
        formData.append('productDto',JSON.stringify(productDTO))
        alert(productDTO);
        console.log(productDTO)
        e.preventDefault();
        
            axios.post((baseURL+"/add"), formData,header)
                .then((response) =>
                    navigate("/"));
        
    }
    useEffect(() => {
       
            const productDTO ={
                product : {
                    name : formValues.name,
                    description : formValues.description,
                    price : formValues.price,
                    status : "ACTIVE",
                    imageName : formValues.imageName
                },
                category : formValues.selectedCategory,
                stock : {
                    quantity : formValues.quantity,
                    unit : formValues.unit
                }
            }
            const formData = new FormData()
            formData.append('productDto',JSON.stringify(productDTO))
            axios.put((baseURL+"/edit"),formData)
                .then(response => {
                    navigate("/");
                    console.log(formData);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        
    }, []);
    return (
        <div className='addProductContainer'>
            
        <div className='inputContainer'>
            <label className='inputLabel'>Product Name</label>
            <input className="addProductInput" type="text" id="name"
                value={formValues.name}
                onChange={handleChange}
                name="name" />

            <label className='inputLabel'>Description</label>
            <input className="addProductInput" type="text" id="description"
                value={formValues.description}
                onChange={handleChange}
                name="description" />

            <label className='inputLabel'>Image</label>
            <input className="addProductInput" type="text" id="imageName"
                value={formValues.imageName}
                onChange={handleChange}
                name="imageName"
            />

            <label className='inputLabel'>Status</label>
            <input className="addProductInput" type="text" id="status"
                value={formValues.status}
                onChange={handleChange}
                name="status" />

            <label className='inputLabel'>Product Price</label>
            <input className="addProductInput" type="text" id="price"
                value={formValues.price}
                onChange={handleChange}
                name="price" />

            <label className='inputLabel'>Category</label>
            <input className="addProductInput" type="text" id="selectedCategory"
                value={formValues.selectedCategory}
                onChange={handleChange}
                name="selectedCategory" />
            
            <label className='inputLabel'>Quantity</label>
            <input className="addProductInput" type="text" id="quantity"
                value={formValues.quantity}
                onChange={handleChange}
                name="quantity" />
            
            <label className='inputLabel'>Unit</label>
            <input className="addProductInput" type="text" id="unit"
                value={formValues.unit}
                onChange={handleChange}
                name="unit" />

            <button className='saveButton' onClick={handleSubmit}>Save</button>
        </div>
    </div>
    )
}

export default AddProduct