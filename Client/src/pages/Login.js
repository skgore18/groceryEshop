import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../service/auth.service';
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const userDetail = {
        email : email,
        password : password
    }
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        authService.login(userDetail).then((res)=>{
            const role = res.data.role;
            if (role === "ADMIN"){
                navigate("/adminDashboard");
                window.location.reload();
            } else if (role === "CUSTOMER"){
                navigate("/");
                window.location.reload();
            }
            else if (role === "DELIVERY_PERSON"){
                navigate("/deliverOrderScreen");
                window.location.reload();
            }
            })
        .catch((err)=>{
            console.log(err)
        })
        
        
    }
  return (
    <div className="bodyContainer">
            <div id="login">
                <div className="login-container">
                    <form className="form">
                        <div className="field-container">
                            <label className="l">Email</label>
                            <input className="field" type="email" autoComplete="off" spellCheck="false" onChange={e=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className="field-container">
                            <label className="l">Password</label>
                            <input className="field" type="password" onChange={e=>{setPassword(e.target.value)}} />
                        </div>
                        
                        <input type='submit' value="Login"  onClick={handleLogin} />
                        
                        <p>Forgot your password?</p>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login