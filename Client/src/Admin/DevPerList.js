import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import authService from '../service/auth.service';
import { GetAppTwoTone, HomeOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const DevPerList = () => {
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
    const [users, setUsers] = useState([]);
    const baseURL = "http://localhost:9090/eshop/user"

    const getUsers = () => {
        axios.get(baseURL+"/delivery_persons", header).then((response)=>{
            setUsers(response.data.data);
        }).catch(error => { });
    }

    return (
        <div>
            <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <Link to="/adminDashboard"><HomeOutlined/></Link>
                <h1 className="adminProductListTitle">Deliverers List</h1>
                <GetAppTwoTone onClick={getUsers}/>
            </div>
            <table className='userTable'>
                <thead className='tableHeading'>
                    <tr>
                        <th className='userTableHeading'>First Name</th>
                        <th className='userTableHeading'>Last Name</th>
                        <th className='userTableHeading'>Email</th>
                        <th className='userTableHeading'>Phone Number</th>
                        <th className='userTableHeading'>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td className='rowContent'><div className="actionButtons">{user.firstName}</div></td>
                                <td className='rowContent'><div className="actionButtons">{user.lastName}</div></td>
                                <td className='rowContent'><div className="actionButtons">{user.email}</div></td>
                                <td className='rowContent'><div className="actionButtons">{user.phoneNo}</div></td>
                                <td className='rowContent'><div className="actionButtons">{user.role}</div></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DevPerList