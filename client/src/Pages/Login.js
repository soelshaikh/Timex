import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from 'react-bootstrap/Spinner';



const Login = () => {


    const navigate = useNavigate();
    const notifyDone = () => toast("Registration Done.Please Login to Continue!");
    const notifyforWait = () => toast("Please Wait...");

    // login credentials
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otpValue, setOtpValue] = useState("")
    const [email1, setEmail1] = useState("")
    const [password1, setPassword1] = useState("")
    const [fname, setFname] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [selectedIndex, setSelectedIndex] = useState("")


    const [fnameError, setFnameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [cPasswordError, setCpasswordError] = useState("")
    const [LoginEmailError, setLoginEmailError] = useState("")
    const [LoginPassError, setLoginPassError] = useState("")
    const [spinner, setSpinner] = useState(false)


    const [passShow, setPassShow] = useState(false);
    const [passShow1, setPassShow1] = useState(false);
    const [passShow2, setPassShow2] = useState(false);

    const [flag, setFlag] = useState(false);
    console.log(flag);

    const loginWithOtpOrPasswordHandler = () => {

        if (flag === false) {
            setFlag(true)
        } else {
            setFlag(false)
        }
    }

    const passwordShowHideHandler = () => {
        if (passShow === false) {
            setPassShow(true)
        } else {
            setPassShow(false)
        }
    }

    const passwordShowHideHandler1 = () => {
        if (passShow1 === false) {
            setPassShow1(true)
        } else {
            setPassShow1(false)
        }
    }

    const passwordShowHideHandler2 = () => {
        if (passShow2 === false) {
            setPassShow2(true)
        } else {
            setPassShow2(false)
        }
    }

    const loginHandler = async (e) => {

        e.preventDefault();
        let submit = false;
        if (selectedIndex === "") {
            if (email === "") {
                submit = false;
                setLoginEmailError("Please Enter Email ")
            }
            else {
                submit = true
                setLoginEmailError("")
            } if (password === "") {
                submit = false;
                setLoginPassError("Please Enter Password")
            } else {
                submit = true
                setLoginPassError("")
            }

        }
        if (submit === true) {
            const login_api = await fetch("http://localhost:5000/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const res = await login_api.json();
            console.log(res.status);
            if (res.status == 201) {
                localStorage.setItem("usersdatatoken", res.result.token)
                navigate("/admin")
                //alert("done")
                setEmail("")
                setPassword("")
            } else if (res.status == 202) {
                localStorage.setItem("usersdatatoken", res.result.token)
                toast.success("Login Successfull..!")
                setTimeout(() => {
                    navigate("/")
                }, 5000)
                
                //alert("done")
                setEmail("")
                setPassword("")
            } else {
                alert("Invalid details")

            }

        }
    }

    const registerHandler = async (e) => {


        // console.log(fname,email1,password1,cPassword);
        e.preventDefault();
        let submit = true
        if (selectedIndex === '') {
            if (fname === '') {
                setFnameError("Please Enter Full Name")
                submit = false
            } else {
                setFnameError("")
                submit = true
            }
            if (email1 === '') {
                setEmailError("Please Enter Email address")
                submit = false
            } else if (!email1.includes("@")) {
                setEmailError("Please Enter Valid Email address")
                submit = false
            }
            else {
                setEmailError("")
                submit = true
            }
            if (password1 === '') {
                setPasswordError("Please Enter Password")
                submit = false
            } else if (password1.length < 6) {
                setPasswordError("Please Enter minimum 6 Character")
                submit = false
            } else {
                setPasswordError("")
                submit = true
            }
            if (cPassword === '') {
                setCpasswordError("Please Enter Confirm Password")
                submit = false
            } else if (cPassword.length < 6) {
                setCpasswordError("Please Enter minimum 6 Character")
                submit = false
            } else {
                setCpasswordError("")
                submit = true
            }
            if (password1 !== cPassword) {
                setCpasswordError("Password and Confirm Password not match")
            }

        }
        if (submit === true) {

            console.log(fname, email1, password1, cPassword);
            const data = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email1, password1, cPassword
                })
            })

            const res = await data.json();
            console.log(res.status);
            if (res.status === 201) {
                // alert("user registration done");
                notifyDone();
                setFname("")
                setEmail1("")
                setPassword1("")
                setCPassword("")
            } else {
                alert("This Email is Already Exist")
            }
        } else {
            console.log("false");
        }
    }

    const otpLoginHandler = async (e) => {
        e.preventDefault();
        let submit = false;
        if (selectedIndex === "") {
            if (email === "") {
                submit = false;
                setLoginEmailError("Please Enter Email ")
            } else if (!email.includes("@")) {
                submit = false
                setLoginEmailError("Enter Valid Email !")
            }
            else {
                submit = true
                setSpinner(true)
                notifyforWait()
                setLoginEmailError("")
            }

        }
        if (submit === true) {
            const login_api = await fetch("http://localhost:5000/sendotp", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email
                })
            })

            const res = await login_api.json();
            if (res.status === 200) {
                setSpinner(false)
                navigate("/user/otp", { state: email })
            } else {
                toast.error("Your Email Not Registered With us")
                console.log(res);
                setSpinner(false)
            }


        }
    }

    return (
        <>

            <Header />
            <ToastContainer />
            <div className="breadcrumb-section breadcrumb-bg-color--golden">
                <div className="breadcrumb-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="breadcrumb-title">Login</h3>
                                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                                    <nav aria-label="breadcrumb">
                                        <ul>
                                            <li><a href="index.html">Home</a></li>
                                            {/* <li><a href="shop-grid-sidebar-left.html">Shop</a></li> */}
                                            <li className="active" aria-current="page">Login</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="customer-login">
                <div className="container">
                    <div className="row">
                        {/* <!--login area start--> */}
                        <div className="col-lg-6 col-md-6">
                            <div className="account_form" data-aos="fade-up" data-aos-delay="0">
                                <h3>login</h3>
                                <form action="#" method="POST">
                                    <div className="default-form-box">
                                        <label>Email Address<span>*</span></label>
                                        <input type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            name="email"
                                            placeholder='Enter Your Email'

                                        />
                                        <div style={{ color: "red" }}>{LoginEmailError}</div>
                                    </div>
                                    {
                                        flag == false ? <>
                                            <div className='default-form-box'>
                                                <label>Password <span>*</span></label>
                                                <div style={{
                                                    display: "flex", alignItems: "center",
                                                    position: "relative"
                                                }}>

                                                    <input
                                                        type={!passShow ? "password" : "text"}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        value={password}
                                                        name="password"
                                                        placeholder='Enter Your Password'
                                                    />

                                                    <div className='showpass' onClick={() => { passwordShowHideHandler() }}>
                                                        {passShow === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                    </div>
                                                </div>

                                                <div style={{ color: "red" }}>{LoginPassError}</div>
                                                <a style={{ marginLeft: "430px", marginTop: "40px" }} onClick={loginWithOtpOrPasswordHandler}>Login with OTP</a>
                                            </div>
                                            <div className="login_submit">
                                                <button className="btn btn-md btn-black-default-hover mb-4" type="submit" onClick={loginHandler}>login with password</button>
                                            </div>
                                        </> : <>

                                            <div className='default-form-box'>
                                                {/* <label>OTP <span>*</span></label> */}
                                                {/* <div style={{
                                            display: "flex", alignItems: "center",
                                            position: "relative"
                                        }}>

                                            <input
                                                type="text"
                                                onChange={(e) => setOtpValue(e.target.value)}
                                                value={otpValue}
                                                name="otp"
                                                placeholder='Enter Your Otp'
                                            />

                                            
                                        </div> */}

                                                {/* <div style={{ color: "red" }}>{LoginOtpError}</div> */}
                                                <a style={{ marginLeft: "380px", marginTop: "40px" }} onClick={loginWithOtpOrPasswordHandler}>Login with Password</a>
                                            </div>
                                            <div className="login_submit">
                                                <button className="btn btn-md btn-black-default-hover mb-4" type="submit" onClick={otpLoginHandler}>Send OTP

                                                    {

                                                        spinner == true ? <span>
                                                        
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                            <span className="visually-hidden">Loading...</span>
                                                        </span> : ""
                                                    }

                                                </button>
                                            </div>
                                        </>
                                    }

                                </form>
                            </div>
                        </div>
                        {/* <!--login area start-->

            <!--register area start--> */}
                        <div className="col-lg-6 col-md-6">
                            <div className="account_form register" data-aos="fade-up" data-aos-delay="200">
                                <h3>Register</h3>
                                <form action="#">
                                    <div className="default-form-box">
                                        <label>Full name <span>*</span></label>
                                        <input type="text"
                                            onChange={(e) => setFname(e.target.value)}
                                            value={fname}
                                            name="fname"
                                            placeholder='Enter Your Name'
                                        />
                                        <div style={{ color: "red" }}>{fnameError}</div>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Email address <span>*</span></label>
                                        <input type="email"
                                            onChange={(e) => setEmail1(e.target.value)}
                                            value={email1}
                                            name="email1"
                                            placeholder='Enter Your Email'
                                        />
                                        <div style={{ color: "red" }}>{emailError}</div>
                                    </div>
                                    <div className='default-form-box'>
                                        <label>Password <span>*</span></label>
                                        <div style={{
                                            display: "flex", alignItems: "center",
                                            position: "relative"
                                        }}>

                                            <input
                                                type={!passShow1 ? "password" : "text"}
                                                onChange={(e) => setPassword1(e.target.value)}
                                                value={password1}
                                                name="password1"
                                                placeholder='Enter Your Password' />

                                            <div className='showpass' onClick={() => { passwordShowHideHandler1() }}>
                                                {passShow1 === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </div>
                                        </div>
                                        <div style={{ color: "red" }}>{passwordError}</div>
                                    </div>
                                    <div className="default-form-box">
                                        <label>Confirm Password <span>*</span></label>

                                        <div style={{
                                            display: "flex", alignItems: "center",
                                            position: "relative"
                                        }}>

                                            <input type={!passShow2 ? "password" : "text"}
                                                onChange={(e) => setCPassword(e.target.value)}
                                                value={cPassword}
                                                name="cPassword"
                                                placeholder='Enter Your Confirm Password'
                                            />
                                            <div className='showpass2' onClick={() => { passwordShowHideHandler2() }}>
                                                {passShow2 === false ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </div>
                                        </div>
                                        <div style={{ color: "red" }}>{cPasswordError}</div>

                                    </div>
                                    <div className="login_submit">
                                        <button className="btn btn-md btn-black-default-hover" type="submit" onClick={registerHandler}>Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <!--register area end--> */}
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default Login