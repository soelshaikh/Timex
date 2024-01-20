import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const EditAdress = () => {

    const [list, setList] = useState([])
    const [products, setProducts] = useState("")
    const { id } = useParams("");
    const [address, setAddress] = useState("")
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [streetAddress, setStreetAddress] = useState("")
    const [landmark, setLandmark] = useState("")
    const [pincode, setPincode] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()
    const [fnameError, setFnameError] = useState("");
    const [lnameError, setLnameError] = useState("");
    const [streetAddressError, setStreetAddressError] = useState("")
    const [landmarkError, setLandmarkError] = useState("")
    const [pincodeError, setPincodeError] = useState("")
    const [cityError, setCityError] = useState("")
    const [stateError, setStateError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [emailError, setEmailError] = useState("")


    const [selectedIndex, setSelectedIndex] = useState("")

    const [addressForm, setAddressFrom] = useState(false)

    const EditAddressHandler= async(e) =>{
        e.preventDefault();

        let submit = true;
        if (selectedIndex === '') {
            if (fname === '') {
                submit = false
                setFnameError("Enter First Name*")
            } else {
                submit = true
                setFnameError("")
            }
            if (lname === '') {
                submit = false
                setLnameError("Enter Last Name*")
            } else {
                submit = true
                setLnameError("")
            }
            if (streetAddress === '') {
                submit = false
                setStreetAddressError("Enter Street Address*")
            } else {
                submit = true
                setStreetAddressError("")
            }
            if (landmark === '') {
                submit = false
                setLandmarkError("Enter Landmark Name*")
            } else {
                submit = true
                setLandmarkError("")
            }
            if (pincode === '') {
                submit = false
                setPincodeError("Enter Pincode*")
            } else {
                submit = true
                setPincodeError("")
            }
            if (city === '') {
                submit = false
                setCityError("Enter City Name*")
            } else {
                submit = true
                setCityError("")
            }
            if (state === '') {
                submit = false
                setStateError("Enter State Name*")
            } else {
                submit = true
                setStateError('')
            }
            if (phone === '') {
                submit = false
                setPhoneError("Enter Phone Number*")
            } else{
                submit = true
                setPhoneError("")
            }
            if (email === '') {
                submit = false
                setEmailError("Enter Email Address*")
            } else {
                submit = true
                setEmailError("")
            }

        }

        if (submit === true) {
            let token = localStorage.getItem("usersdatatoken")
            const res = await fetch(`/updateaddress/${id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    fname: fname,
                    lname: lname,
                    streetAddress: streetAddress,
                    landmark: landmark,
                    pincode: pincode,
                    city: city,
                    state: state,
                    phone: phone,
                    email: email

                }),
                credentials: "include"
            });

            const data = await res.json()
            console.log(data);
            if (res.status === 422 || !data) {
                console.log("error");
            } else {

                getAddressApi()
                //alert("Addess Updated Succesfully")
                toast.success("Address Update Succesfully")
                setTimeout(()=>{
                    navigate("/myaccount")
                },2000)
                console.log("address updated");

            }
        }


    }

    const getAddressApi = async() =>{
        let token = localStorage.getItem("usersdatatoken")
    const res = await fetch(`/getaddress/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json", 
            "Authorization": token
        },
        credentials: "include"
    });

    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
        alert("no data available")
    } else {
        console.log("mil gya");
        setFname(data.fname)
        setLname(data.lname)
        setStreetAddress(data.streetAddress)
        setLandmark(data.landmark)
        setPincode(data.pincode)
        setCity(data.city)
        setState(data.state)
        setPhone(data.phone)
        setEmail(data.email)
        
    }
    }
    useEffect(() => {
       
        getAddressApi()
    }, []);
  return (
    <>
    <Header />
   <ToastContainer/>
    <div className="checkout-section">
                    <div className="container">
                        <div className="row">


                        </div>
                        <div className="checkout_form" >
                            <div className="row">
                                <div className="col-lg-12 col-md-6">
                                    <form action="#">
                                        <h3 style={{marginTop:"3rem"}}>Edit Address Details</h3>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="default-form-box">
                                                    <label>First Name <span>*</span></label>
                                                    <input type="text" value={fname} onChange={(e) => { setFname(e.target.value) }} />
                                                    <div style={{ color: "red" }}>{fnameError}</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="default-form-box">
                                                    <label>Last Name <span>*</span></label>
                                                    <input type="text" value={lname} onChange={(e) => { setLname(e.target.value) }} />
                                                    <div style={{ color: "red" }}>{lnameError}</div>
                                                </div>
                                            </div>


                                            <div className="col-12">
                                                <div className="default-form-box">
                                                    <label>Street address <span>*</span></label>
                                                    <input placeholder="House number and street name" type="text"value={streetAddress} onChange={(e) => { setStreetAddress(e.target.value) }} />
                                                    <div style={{ color: "red" }}>{streetAddressError}</div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="default-form-box">
                                                    <label>Landmark <span>*</span></label>
                                                    <input placeholder="Landmark" type="text" value={landmark} onChange={(e) => { setLandmark(e.target.value) }} />
                                                    <div style={{ color: "red" }}>{landmarkError}</div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="default-form-box">
                                                    <label>Pincode <span>*</span></label>
                                                    <input type="text" value={pincode} onChange={(e) => { setPincode(e.target.value) }} />
                                                    <div style={{ color: "red" }}>{pincodeError}</div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="default-form-box">
                                                    <label>Town / City <span>*</span></label>
                                                    <input type="text" onChange={(e) => { setCity(e.target.value) }} value={city}/>
                                                    <div style={{ color: "red" }}>{cityError}</div>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="default-form-box">
                                                    <label>State / County <span>*</span></label>
                                                    <input type="text" onChange={(e) => { setState(e.target.value) }} value={state} />
                                                    <div style={{ color: "red" }}>{stateError}</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="default-form-box">
                                                    <label>Phone<span>*</span></label>
                                                    <input type="text" onChange={(e) => { setPhone(e.target.value) }} value={phone}/>
                                                    <div style={{ color: "red" }}>{phoneError}</div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="default-form-box">
                                                    <label> Email Address <span>*</span></label>
                                                    <input type="text" onChange={(e) => { setEmail(e.target.value) }}  value={email}/>
                                                    <div style={{ color: "red" }}>{emailError}</div>
                                                </div>
                                            </div>

                                            <div className="order_button pt-3">
                                                <button className="btn btn-md btn-black-default-hover" type="submit" onClick={(e) => EditAddressHandler(e)} >Update Address</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
</>
  )
}

export default EditAdress