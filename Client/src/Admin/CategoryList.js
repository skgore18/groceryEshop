import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import authService from '../service/auth.service';
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const user = authService.getCurrentUser();
  const role= user.role
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
  const [category, setcategory] = useState([]);
  const [nameError, setNameError] = useState("");
  

  const baseURL = "http://localhost:9090/eshop/category"
  const url_delete= "http://localhost:9090/eshop/category/delete"
  const url_edit= "http://localhost:9090/eshop/category/edit"

  const getUsers = () => {
    axios.get(baseURL + "/all", header).then((response) => {
      setcategory(response.data.data)
      
    }).catch(error => { });
  }

  const onEdit = (category) =>{
    if(category.name.length === 0 ){
      setNameError("Category Name is required")
  }
  else{
    const {id,name,status} = category
    const body ={id,name,status}
    axios.put(url_edit,body,header)
    .then((response)=>{
        })
    .catch((error)=>{})
  }
}
   
  const onDelete = (id) => {
    console.log(id)
    axios.delete(url_delete+`/${id}`,header)
    .then((response)=>{
       
    })
    .catch((error)=>{
        
    })
}
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Link to="/adminDashboard"><HomeOutlined /></Link>
        <h1 className="adminProductListTitle">Category List</h1>
        <GetAppTwoTone onClick={getUsers} />
      </div>
      <table className='userTable'>
        <thead className='tableHeading'>
          <tr>
             <th className='userTableHeading'> Id</th>
            <th className='userTableHeading'> Name</th>
            <th className='userTableHeading'> Status</th>
            <th className='userTableHeading'>Save</th>
            <th className='userTableHeading'>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            category.map(category => (
              <tr key={category.id} >
                <td className='rowContent'><div className="actionButtons"><h5> {category.id}</h5></div></td>
                <td className='rowContent'><div className="actionButtons"><h5> {category.name}</h5></div></td>
                <td className='rowContent'><div className="actionButtons"><h5> {    
                                                            category.status === "ACTIVE" &&
                                                            <select onChange={(e)=>{category.status=e.target.value}}>
                                                                <option>ACTIVE</option>
                                                                <option>INACTIVE</option>
                                                            </select>
                                                        }
                                                        {    
                                                            category.status === "INACTIVE" &&
                                                            <select onChange={(e)=> {category.status=e.target.value}}>
                                                                <option>INACTIVE</option>
                                                                <option>ACTIVE</option>
                                                            </select>
                                                        }</h5></div></td>
                <td className='rowContent'><div className="actionButtons"><p><button className="actionButtons" onClick={() => onEdit(category)}>Save </button>  </p></div></td>
                <td className='rowContent'><div className="actionButtons"><p><button className="actionButtons" onClick={()=> onDelete(category.id)}>Remove </button>  </p></div></td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default CategoryList