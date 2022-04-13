import { GetAppOutlined } from '@material-ui/icons';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import authService from '../service/auth.service';
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const StockReport = () => {
  const [categoryList, setCategoryList] = useState([])
    const [productDetails, setProductDetails] = useState([])
  const user = authService.getCurrentUser();
  let a;
  if (user !== null) {
    a = user.token
  }
   
  const url_stock="http://localhost:9090/eshop/product/stock/category-report"
  const url_cat_all = "http://localhost:9090/eshop"+"/category/all"
  const header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + a
    },
  };

  useEffect(()=>{

    axios.get(url_cat_all, header)
    .then(response => {
        setCategoryList([]) 
        setCategoryList(response.data.data)
        onSelectCategory(response.data.data[0].name)
    })
    .catch(error => {
       
    })

}, [])


  const onSelectCategory = (categoryName) => {
    axios.get(url_stock+`/${categoryName}`, header)
    .then(res=>{
      setProductDetails(res.data.data);
    })
  }
  return (
    <div>
      <Link to="/adminDashboard"><HomeOutlined/></Link>
      <h1 className="adminProductListTitle">Stock Report</h1>
    <div className="mb-3 text-center">
                <strong className="fs-5 form-label">Category : </strong>
                {
                    categoryList.length>0 &&
                    <select className="nextBtn" onChange={e => { onSelectCategory(e.target.value)} }>
                        <option disabled selected>Select category</option>
                        {
                            categoryList.map(category =>{
                                return(
                                    <option>{category.name}</option>
                                )
                            })
                        }
                       
                    </select> 
                }
            </div>
    <table className='userTable'>
        <thead className='tableHeading'>
          <tr>
            <th className='userTableHeading'>Product ID</th>
            <th className='userTableHeading'>Product Name</th>
            <th className='userTableHeading'>Product Stock</th>
            <th className='userTableHeading'>Units</th>
          </tr>
        </thead>
        <tbody>
        { 
          productDetails.map(detail=>(
         <tr key={detail.id}>
            <td className='rowContent'>{detail.product.id}</td>
            <td className='rowContent'>{detail.product.name}</td>
            <td className='rowContent'>{detail.stock.quantity}</td>
            <td className='rowContent'>{detail.stock.unit}</td>
         </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  )
}

export default StockReport