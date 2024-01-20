
import React, { useEffect, useState } from 'react'
import { useNavigate ,NavLink} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import EditIcon from '@mui/icons-material/Edit';
import './Address.css';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Address = () => {

    const location = useLocation();
    console.log(location.state.coupanName);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [streetAddress, setStreetAddress] = useState("")
    const [landmark, setLandmark] = useState("")
    const [pincode, setPincode] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [wbalance,setWbalance] = useState(0)
    const [coupanName,setcoupanName] = useState("")
    const [coupanDiscount,setcoupanDiscount] = useState(0)
    const [CoupanDiscountPrice,setCoupanDiscountPrice] = useState(0)
    
    
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
    const [address, setAddress] = useState([])
    const [addressForm, setAddressFrom] = useState(false)
    console.log(addressForm);
    const addAddressHandler = async (e) => {
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
            } else {
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
            const res = await fetch("/addaddress", {
                method: "POST",
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
                toast.success("Address Added Succesfully")
                getAddressApi()
                console.log("address added");

            }
        }

    }
    const addAddressHandler1 = async (e) => {
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
            } else {
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
            const res = await fetch("/addaddress", {
                method: "POST",
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
                
                toast.success("Address Added Succesfully")
                getAddressApi()
                setTimeout(()=>{

                    navigate("/cart")
                },3000)
                console.log("address added");

            }
        }

    }

    const getAddressApi = async () => {

        let token = localStorage.getItem("usersdatatoken")
        const res = await fetch("/getalladdress", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data.length);

        if (res.status !== 201) {
            alert("no data available")
        } else {
            console.log("else part");
            setAddress(data)
            setWbalance(location.state?.WalletBalance)
    setcoupanName(location.state?.coupanName)
    console.log(location.state?.coupanName);
    console.log(coupanName);
    setcoupanDiscount(location.state?.CoupanDiscount)
    setCoupanDiscountPrice(location?.state?.CoupanDiscountPrice)
    

        }
    }
    console.log(coupanName);
    useEffect(() => {
        getAddressApi()
    }, []);

    return (
        <>
            <Header />
            <div class="breadcrumb-section breadcrumb-bg-color--golden">
                <div class="breadcrumb-wrapper">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <h3 class="breadcrumb-title">Checkout</h3>
                                <div class="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                                    <nav aria-label="breadcrumb">
                                        <ul>
                                            <li><NavLink to={"/"}>Home</NavLink></li>
                                            <li><NavLink to={"/cart"}>Cart</NavLink></li>
                                            <li class="active" aria-current="page">Address</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                addressForm == false ?
                    address?.length > 0
                        ?

                        <div class="grid" >

                            {
                                address.map((item) => {
                                    return (
                                        
                                        <label class="card" onClick={() => navigate(`/checkout/${item._id}`,{
                                            state:{
                                                id : location.state.id,
                                                WalletBalance:wbalance,
                                                coupanName:coupanName,
                                                CoupanDiscount:coupanDiscount,
                                                CoupanDiscountPrice:CoupanDiscountPrice
                                            }
                                        })}>
                                            

                                            <span class="plan-details">
                                                <span class="plan-type">Home</span>        
                                                <span class="plan-cost">{item.fname}<span class="slash"> </span><abbr class="plan-cycle" title="month">{item.lname}</abbr></span>
                                                <span >{item.streetAddress},{item.landmark},{item.city},{item.state},{item.pinocde} <span class="slash"> -</span>{item.pincode}</span>
                                                <span>{item.phone}</span>
                                                <span>{item.email}</span>
                                            </span>
                                        </label>
                                    )
                                })
                            }


                            <div className="order_button pt-3">
                                <button className="btn btn-md btn-black-default-hover" type="submit" onClick={() => { setAddressFrom(true) }}>Add Address</button>
                            </div>
                        </div>


                        : <div className="checkout-section">
                            <div className="container">
                                <div className="row">


                                </div>
                                <div className="checkout_form" >
                                    <div className="row">
                                        <div className="col-lg-12 col-md-6">
                                            <form action="#">
                                                <h3>Address Details</h3>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>First Name <span>*</span></label>
                                                            <input type="text" onChange={(e) => { setFname(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{fnameError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>Last Name <span>*</span></label>
                                                            <input type="text" onChange={(e) => { setLname(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{lnameError}</div>
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <div className="default-form-box">
                                                            <label>Street address <span>*</span></label>
                                                            <input placeholder="House number and street name" type="text" onChange={(e) => { setStreetAddress(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{streetAddressError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="default-form-box">
                                                            <label>Landmark <span>*</span></label>
                                                            <input placeholder="Landmark" type="text" onChange={(e) => { setLandmark(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{landmarkError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="default-form-box">
                                                            <label>Pincode <span>*</span></label>
                                                            <input type="text" onChange={(e) => { setPincode(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{pincodeError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="default-form-box">
                                                            <label>Town / City <span>*</span></label>
                                                            <input type="text" onChange={(e) => { setCity(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{cityError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-3">
                                                        <div className="default-form-box">
                                                            <label>State / County <span>*</span></label>
                                                            <input type="text" onChange={(e) => { setState(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{stateError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label>Phone<span>*</span></label>
                                                            <input type="text" onChange={(e) => { setPhone(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{phoneError}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="default-form-box">
                                                            <label> Email Address <span>*</span></label>
                                                            <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
                                                            <div style={{ color: "red" }}>{emailError}</div>
                                                        </div>
                                                    </div>

                                                    <div className="order_button pt-3">
                                                        <button className="btn btn-md btn-black-default-hover" type="submit" onClick={(e) => addAddressHandler(e)}>Add Address</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                    <div className="checkout-section">
                        <div className="container">
                            <div className="row">


                            </div>
                            <div className="checkout_form" >
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                        <form action="#">
                                            <h3>Address Details</h3>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="default-form-box">
                                                        <label>First Name <span>*</span></label>
                                                        <input type="text" onChange={(e) => { setFname(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{fnameError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="default-form-box">
                                                        <label>Last Name <span>*</span></label>
                                                        <input type="text" onChange={(e) => { setLname(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{lnameError}</div>
                                                    </div>
                                                </div>


                                                <div className="col-12">
                                                    <div className="default-form-box">
                                                        <label>Street address <span>*</span></label>
                                                        <input placeholder="House number and street name" type="text" onChange={(e) => { setStreetAddress(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{streetAddressError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="default-form-box">
                                                        <label>Landmark <span>*</span></label>
                                                        <input placeholder="Landmark" type="text" onChange={(e) => { setLandmark(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{landmarkError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="default-form-box">
                                                        <label>Pincode <span>*</span></label>
                                                        <input type="text" onChange={(e) => { setPincode(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{pincodeError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="default-form-box">
                                                        <label>Town / City <span>*</span></label>
                                                        <input type="text" onChange={(e) => { setCity(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{cityError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="default-form-box">
                                                        <label>State / County <span>*</span></label>
                                                        <input type="text" onChange={(e) => { setState(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{stateError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="default-form-box">
                                                        <label>Phone<span>*</span></label>
                                                        <input type="text" onChange={(e) => { setPhone(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{phoneError}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="default-form-box">
                                                        <label> Email Address <span>*</span></label>
                                                        <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
                                                        <div style={{ color: "red" }}>{emailError}</div>
                                                    </div>
                                                </div>

                                                <div className="order_button pt-3">
                                                    <button className="btn btn-md btn-black-default-hover" type="submit" onClick={(e) => addAddressHandler1(e)}>Add Address</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Footer></Footer>
        </>
    )
}

export default Address