import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';


const Otp = () => {

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const [otp,setOtp]  = useState("");
  const [otpError,setOtpError] = useState("");
  const [selecctedIndex,setSelectedIndex] = useState("");
  const [spinner,setSpinner] = useState(false)

  const OtpVerificationHandler = async(e) =>{

    e.preventDefault();
    let submit = true;

    if(selecctedIndex == ""){
      if(otp===""){
        setOtpError("Please Enter Otp ");
        submit = false
      }else if (!/[^a-zA-Z]/.test(otp)) {
        setOtpError("Enter Valid Otp")
        submit = false
      } else if (otp.length < 6) {
        setOtpError("Otp Length minimum 6 digit")
        submit = false
      }else{
        submit = true;
        setOtpError("")
        setSpinner(true)
      }

      if(submit === true){

        const login_api = await fetch("http://localhost:5000/verifyOtp", {
          method: "POST",

          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              otp,email:location.state
          })
      })

      const res = await login_api.json();
      // console.log(res);
      // console.log(res.status);
      if (res.status == 201) {
        localStorage.setItem("usersdatatoken", res.result.token)
        navigate("/admin")
        //alert("done")
        setOtp("")
        setSpinner(false)
        
    } else if (res.status == 202) {
        localStorage.setItem("usersdatatoken", res.result.token)
        toast.success("Login Successfull..!")
        setTimeout(()=>{
            navigate("/")
        },5000)
        setSpinner(false)
        //alert("done")
        setOtp("")
        
    } else {
        alert("Invalid details")
        setSpinner(false)

    }


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
                        <div className="col-lg-6 col-md-12" style={{marginLeft:"30%"}}>
                            <div className="account_form" data-aos="fade-up" data-aos-delay="0">
                                <h3>login</h3>
                                <form action="#" method="POST">
                                    <div className="default-form-box">
                                        <label>Otp<span>*</span></label>
                                        <input type="text"
                                            onChange={(e) => setOtp(e.target.value)}
                                            value={otp}
                                            name="otp"
                                            placeholder='Enter Your Otp'

                                        />
                                        <div style={{ color: "red" }}>{otpError}</div>
                                    </div>

                                    <div className="login_submit">
                                        <button className="btn btn-md btn-black-default-hover mb-4" type="submit" onClick={OtpVerificationHandler}>Login
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
}</button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <ToastContainer />
            <Footer />
    </>
  )
}

export default Otp