import { useState } from "react";
import React from "react";
import "../pages/Login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterDelivery =() => {
    const initialValues = { firstName: "",lastName:"", email: "", phoneNo: "", password: "", role : "DELIVERY_PERSON"};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [hideBox, setHideBox] = useState({
        display : 'none'
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const baseUrl = "http://localhost:9090/eshop/user/register";
    const navigateToLogin = () => {
        navigate('/adminDashboard')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formValues.firstName) {
            formErrors.firstName = "First Name is required";
        } else if (!formValues.lastName){
            formErrors.lastName = "Last Name is required"
        } else if (!formValues.email) {
            formErrors.email = "Email is required";
        } else if (!regex.test(formValues.email)) {
            formErrors.email = "This is not a valid email."
        } else if (!formValues.phoneNo) {
            formErrors.phoneNo = "Phone Number is required";
        } else if (!formValues.password) {
            formErrors.password = "Password is required";
        } else if (formValues.password.length < 8) {
            formErrors.password = "Password Should Be More Than 8 Characters."
        } else {
        axios.post(baseUrl, formValues)
        .then((res)=>{
            console.log(formValues);
            if (res.status === 201) {
                setHideBox({
                    display : "flex"
                })
            }
        });
        }
    }
    return (
        <div className="bodyContainer">
            <div id="login">
                <div className="login-container">
                    <form className="form">
                        <div className="field-container">
                            <label className="l">First Name</label>
                            <input className="field" type="text" autoComplete="off" spellCheck="false"
                                value={formValues.firstName}
                                onChange={handleChange}
                                name="firstName"
                                id="firstName" />
                            <p className="textdanger">{formErrors.firstName}</p>
                        </div>
                        <div className="field-container">
                            <label className="l">Last Name</label>
                            <input className="field" type="text" autoComplete="off" spellCheck="false"
                                value={formValues.lastName}
                                onChange={handleChange}
                                name="lastName"
                                id="lastName" />
                            <p className="textdanger">{formErrors.lastName}</p>
                        </div>
                        <div className="field-container">
                            <label className="l">Email</label>
                            <input className="field" type="text" autoComplete="off" spellCheck="false"
                                value={formValues.email}
                                onChange={handleChange}
                                name="email"
                                id="email" />
                            <p className="textdanger">{formErrors.email}</p>
                        </div>
                        <div className="field-container">
                            <label className="l">Phone Number</label>
                            <input className="field" type="text" autoComplete="off" spellCheck="false"
                                value={formValues.phoneNo}
                                onChange={handleChange}
                                name="phoneNo"
                                id="phoneNo" />
                            <p className="textdanger">{formErrors.phoneNo}</p>
                        </div>
                        <div className="field-container">
                            <label className="l">Password</label>
                            <input className="field" type="password"
                                value={formValues.password}
                                onChange={handleChange}
                                name="password"
                                id="password" />
                            <p className="textdanger">{formErrors.password}</p>
                        </div>
                        <input type="submit" value="Sign Up" onClick={handleSubmit}/>
                        
                    </form>
                    <div className="responseOK" style={hideBox}>
                    <div className="statusOKContainer">
                        <button className="okButton"  onClick={navigateToLogin}>OK</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterDelivery