import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header';
import moment from "moment";
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { LoginContext } from '../components/ContextProvider/Context'; 
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const MyAccount = () => {

    const [oldPassword,setOldPassword] = useState("")
    const regex = "^[789]\d{9}$";
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [oldPasswordError,setOldPasswordError] = useState("")
    const [newPasswordError,setNewPasswordError] = useState("")
    const [confirmPasswordError,setConfirmPasswordError] = useState("")
    const [openNameBox, setOpenNameBox] = useState(false)
    const [changeFname, setChangeFname] = useState("")
    const [changeFnameError, setChangeFnameError] = useState("")
    const [list, setList] = useState([])
    const [products, setProducts] = useState("")
    const { id } = useParams("");
    const [address, setAddress] = useState([])
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [streetAddress, setStreetAddress] = useState("")
    const [landmark, setLandmark] = useState("")
    const [pincode, setPincode] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [balanceHistoryData,setBalanceHistoryData] = useState([])
    
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

    const { logindata, setLoginData } = useContext(LoginContext)




    //console.log(products.length);
    const getOrdersApi = async () => {

        let token = localStorage.getItem("usersdatatoken")
        console.log(token);
        const res = await fetch("/getorders", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": token
            },
            credentials: "include"
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        //console.log(data.orders[1]);


        if (res.status !== 201) {
            alert("no data available")
        } else {
            console.log("else part");


            setList(data.orders)
            console.log(data.orders);
        }
    }
    console.log(list);

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

        }
    }
    
    
    
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


                console.log("address added");
                setAddressFrom(false)
                toast.success("address added Succesfully")
                getAddressApi()
                setTimeout(()=>{

                    navigate("/myaccount")
                },3000)



            }
        }

    }
    const addressformHandler = () => {
        if (addressForm == true) {

            setAddressFrom(false)
        } else {
            setAddressFrom(true)
        }

    }
    const deleteAddressHandler = async (id) => {

        const res2 = await fetch(`/deleteaddress/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const deleteAddressData = await res2.json();
        console.log(deleteAddressData);

        if (res2.status === 422 || !deleteAddressData) {
            console.log("error");
        }
        else {
            console.log("Address deleted");
            setTimeout(()=>{
                toast.success("Address Deleted Succesfully")
            })
            getAddressApi()
        }
    }
    const DateHandler = async (e) =>{
        e.preventDefault()
        console.log(startDate);
    
         let token = localStorage.getItem("usersdatatoken")
             const res2 = await fetch(`/adddob`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    dateOfBirth:startDate
                }), credentials: "include"
            })



             const data2 = await res2.json()
             console.log(data2);

            if (res2.status === 422 || !data2) {
                console.log("error");
            } else {
                
                toast.success("DOB Updated Succesfully")
                setTimeout(()=>{
                    navigate("/myaccount")
                },3000)
                setLoginData(data2)
                // setOpenNameBox(false)
                console.log("DOB added");
            }
    }
    const nameChangeHandler = async () => {

        if (openNameBox == false) {

            setOpenNameBox(true)
        } else {
            setOpenNameBox(false)
        }
        setChangeFname(logindata?.validUserOne?.fname)
    }

    const nameUpdateHandler = async (e) => {
        e.preventDefault()

        let submit = true;

        if (selectedIndex === '') {
            if (changeFname === "") {
                setChangeFnameError("Please Enter Name")
                console.log(changeFnameError);
                submit = false
            } else {
                setChangeFnameError("")
            }
        }

        if (submit == true) {
            let token = localStorage.getItem("usersdatatoken")
            const res2 = await fetch(`/updatename`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    fname: changeFname
                }), credentials: "include"
            })



            const data2 = await res2.json()
            console.log(data2);

            if (res2.status === 422 || !data2) {
                console.log("error");
            } else {
                
                toast.success("Name Updated Succesfully")
                setTimeout(()=>{
                    navigate("/myaccount")
                },3000)
                setLoginData(data2)
                setOpenNameBox(false)
                console.log("data updated");
            


            }
        }
    }

    // const passwordChnageHandler = async(e) =>{

    //     e.preventDefault();

    //     let submit = true
    //     if(selectedIndex===''){
    //         if(oldPassword===''){
    //             setOldPasswordError("Enter Old Password")
    //             submit = false
    //         }else{
    //             setOldPasswordError("")
    //             submit = true
    //         }if(newPassword===""){
    //             setNewPasswordError("Enter New Password")
    //             submit = false
    //         }else if(newPassword.length < 6){
    //             setNewPasswordError("Enter min 6 Character")
    //             submit = false
    //         }else{
    //             setNewPasswordError("")
    //             submit = true
    //         }if(confirmPassword===""){
    //             setConfirmPasswordError("Enter Confirm Password")
    //             submit = false
    //         }else{
    //             setConfirmPasswordError("")
    //             submit = true
    //         }if(newPassword!=confirmPassword){
    //             setConfirmPasswordError("Password and Confirm Password Does not Match!")
    //         }
    //     }

    //     if(submit === true){
    //          let token = localStorage.getItem("usersdatatoken")

    //          const res3 = await fetch("/updatepassword",{
    //             method: "PATCH",
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 "Authorization": token
    //             },
    //             body: JSON.stringify({
    //                oldPassword,newPassword,confirmPassword
    //             }), credentials: "include"
    //         })

    //         const data2 = await res3.json()
    //         console.log(data2);

    //         if (res3.status === 422 || !data2) {
    //             console.log("error");
    //         }else if(res3.status === 421){
    //             console.log("password does not match");
    //             setOldPasswordError("Invalid Password")
    //         } else {
    //             alert("done")
    //             navigate("/")
    //         }

    //     }
    // }


    useEffect(() => {
        getOrdersApi()
        getAddressApi()
        setBalanceHistoryData(logindata?.validUserOne?.balanceHistory)
        // setLoginData(logindata.validUserOne)
        // console.log(logindata?.validUserOne?.fname);
    },[]);
    return (
        <>
            <Header />
<ToastContainer></ToastContainer>
            <div className="breadcrumb-section breadcrumb-bg-color--golden">
                <div className="breadcrumb-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="breadcrumb-title">My Account</h3>
                                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                                    <nav aria-label="breadcrumb">
                                        <ul>
                                            <li><NavLink to={"/"}>Home</NavLink></li>

                                            <li className="active" aria-current="page">My Account</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="account-dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 col-lg-3">

                            <div className="dashboard_tab_button" >
                                <ul role="tablist" className="nav flex-column dashboard-list">

                                    <li> <a href="#orders" data-bs-toggle="tab"
                                        className="nav-link btn btn-block btn-md btn-black-default-hover">Orders</a></li>

                                    <li><a href="#address" data-bs-toggle="tab"
                                        className="nav-link btn btn-block btn-md btn-black-default-hover">Addresses</a></li>
                                    <li><a href="#account-details" data-bs-toggle="tab"
                                        className="nav-link btn btn-block btn-md btn-black-default-hover" >Account details</a>
                                    </li>
                                    <li><a href="#balance-history" data-bs-toggle="tab"
                                        className="nav-link btn btn-block btn-md btn-black-default-hover" >Balance History</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-9 col-lg-9">

                            <div className="tab-content dashboard_content">
                                <div className="tab-pane fade show active" id="dashboard">
                                    <h4>Dashboard </h4>
                                    <p>From your account dashboard. you can easily check &amp; view your <NavLink to={"/myorders"}>recent
                                        orders</NavLink>, manage your <>shipping and billing addresses</> and <a
                                        >Edit your password and account details.</a></p>
                                </div>
                                <div className="tab-pane fade" id="orders">
                                    <h4>Orders</h4>
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Order</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Total</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    list.map((item, index) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{moment(item.orderDate).format("L")}</td>
                                                                    <td><span className="success">{item.orderStatus}</span></td>
                                                                    <td>{Math.round(item.totalPriceAfterDiscounts)} </td>
                                                                    <td><NavLink to={`/order/${item._id}`} className="view">view</NavLink></td>
                                                                </tr>
                                                                {/* onClick={() => navigate(`/orderdetail/${item._id}`)} */}
                                                            </>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="balance-history">
                                <h4>Balance : {logindata?.validUserOne?.balance}</h4>
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>

                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Status</th>
                                                    {/* <th>Actions</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                     balanceHistoryData?.reverse().map((item, index) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{moment(item.DateAndTime).format("L")}</td>
                                                                    {
    item.Type === "Credited"?
<>
<td style={{color:"green"}}>{Math.round(item.Amount)} </td>
</> :
<>
<td style={{color:"red"}}>{Math.round(item.Amount)} </td>
</>
}
                                                                    <td><span className="success">{item.Type}</span></td>

                                                                    {/* <td><NavLink to={`/order/${item._id}`} className="view">view</NavLink></td> */}
                                                                </tr>
                                                                {/* onClick={() => navigate(`/orderdetail/${item._id}`)} */}
                                                            </>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="tab-pane" id="address">

                                    <h5 className="billing-address">Billing address</h5>
                                    {
                                        addressForm == false ? <a className="view" onClick={() => { addressformHandler() }} style={{cursor:"pointer"}}>Add</a>
                                            : <a className="view" onClick={() => { addressformHandler() }} style={{cursor:"pointer"}}>cancel</a>
                                    }
                                    <p><strong></strong></p>
                                    <address>
                                        {
                                            addressForm === false ?
                                                address.length > 0
                                                    ?

                                                    <div class="grid" >

                                                        {
                                                            address.map((item) => {
                                                                return (
                                                                    <label class="card" >
                                                                        {/* <input name="plan" class="radio" type="radio" checked /> */}

                                                                        <span class="plan-details">
                                                                            <DeleteIcon class="radio" onClick={() => {
                                                                                deleteAddressHandler(item._id)
                                                                            }} />

                                                                            <span class="plan-type"><NavLink to={`/editaddress/${item._id}`}>
                                                                                <EditIcon />
                                                                            </NavLink> </span>
                                                                            <span class="plan-cost">{item.fname}<span class="slash"> </span><abbr class="plan-cycle" title="month">{item.lname}</abbr></span>
                                                                            <span >{item.streetAddress},{item.landmark},{item.city},{item.state},{item.pinocde} <span class="slash"> -</span>{item.pincode}</span>
                                                                            <span>{item.phone}</span>
                                                                            <span>{item.email}</span>
                                                                        </span>
                                                                    </label>
                                                                )
                                                            })
                                                        }


                                                        {/* <div className="order_button pt-3">
                                <button className="btn btn-md btn-black-default-hover" type="submit" onClick={() => { setAddressFrom(true) }}>Add Address1</button>
                            </div> */}
                                                    </div>


                                                    : ""
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
                                                                                <button className="btn btn-md btn-black-default-hover" type="submit" onClick={(e) => addAddressHandler(e)}>Add Address</button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                    </address>
                                </div>
                                <div className="tab-pane fade" id="account-details">
                                    <h3>Account details </h3>
                                    <div className="login">
                                        <div className="login_form_container">
                                            <div className="account_login_form">
                                                <form action="#">

                                                    <div className="input-radio" >
                                                        <span className="custom-radio">{logindata?.validUserOne?.fname}</span>
                                                        {
                                                            openNameBox === false ?
                                                                <span style={{ marginLeft: "5rem" }}><EditIcon onClick={nameChangeHandler}></EditIcon></span>
                                                                :
                                                                <span style={{ marginLeft: "5rem" }}><ClearIcon onClick={nameChangeHandler}></ClearIcon></span>
                                                        }
                                                    </div> <br />
                                                    {
                                                        openNameBox === true ?
                                                            <form>
                                                                <div className="default-form-box mb-20">
                                                                    <label>Enter Name</label>
                                                                    <input type="text" name="first-name" value={changeFname} onChange={(e) => setChangeFname(e.target.value)} />
                                                                    <div style={{ color: "red" }}>{changeFnameError}</div>
                                                                </div>
                                                                
                                                                <div className="save_button mt-3">
                                                                    <button className="btn btn-md btn-black-default-hover"
                                                                        type="submit" onClick={nameUpdateHandler}>Update</button>
                                                                </div>
                                                            </form> :
                                                            ""
                                                    }
                                                    <form>
                                                   {
                                                        logindata?.validUserOne?.dateOfBirth ? <>
                                                             <div className="default-form-box mb-20">
                                                                    <label>Your DOB</label>
                                                                    {/* <input type="text" name="first-name" value={changeFname} onChange={(e) => setChangeFname(e.target.value)} /> */}
                                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} disabled/>
                                                                    <div style={{ color: "red" }}>{changeFnameError}</div>
                                                                </div>
                                                    
                                                        </>:
                                                        <>
                                                             <div className="default-form-box mb-20">
                                                                    <label>Enter DOB</label>
                                                                    {/* <input type="text" name="first-name" value={changeFname} onChange={(e) => setChangeFname(e.target.value)} /> */}
                                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                                                    <div style={{ color: "red" }}>{changeFnameError}</div>
                                                                </div>
                                                    
                                                    <div className="save_button mt-3">
                                                                    <button className="btn btn-md btn-black-default-hover"
                                                                        type="submit" onClick={DateHandler}>Save</button>
                                                                </div>
                                                        </>
                                                   }
                                                    </form>
                                                    {/* <div className="default-form-box mb-20">
                                                        <label>Last Name</label>
                                                        <input type="text" name="last-name" />
                                                    </div>
                                                    <div className="default-form-box mb-20">
                                                        <label>Email</label>
                                                        <input type="text" name="email-name" />
                                                    </div>
                                                    <div className="default-form-box mb-20">
                                                        <label>Password</label>
                                                        <input type="password" name="user-password" />
                                                    </div>
                                                    <div className="default-form-box mb-20">
                                                        <label>Birthdate</label>
                                                        <input type="date" name="birthday" />
                                                    </div>
                                                    <span className="example">
                                                        (E.g.: 05/31/1970)
                                                    </span>
                                                    <br />
                                                    <label className="checkbox-default" for="offer">
                                                        <input type="checkbox" id="offer" />
                                                        <span>Receive offers from our partners</span>
                                                    </label>
                                                    <br />
                                                    <label className="checkbox-default checkbox-default-more-text" for="newsletter">
                                                        <input type="checkbox" id="newsletter" />
                                                        <span>Sign up for our newsletter<br /><em>You may unsubscribe at any
                                                            moment. For that purpose, please find our contact info in the
                                                            legal notice.</em></span>
                                                    </label> */}
                                                    {/* <div className="save_button mt-3">
                                                        <button className="btn btn-md btn-black-default-hover"
                                                            type="submit">Save</button>
                                                    </div> */}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
<Footer/>

        </>
    )
}

export default MyAccount