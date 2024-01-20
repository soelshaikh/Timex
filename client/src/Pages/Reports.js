import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { Button } from '@mui/material';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate, NavLink } from 'react-router-dom'
const moment = require("moment");


const Reports = () => {

  // const [list,setList] = useState([])
  const [CoupanCount, setCoupanCount] = useState([])
  const [Orders, setOrders] = useState([])
  const [PaymentStatus_count, setPaymentStatus_count] = useState([])
  const [ProductCount, setProductCount] = useState([])
  const [TotalsellAfterDiscounts, setTotalsellAfterDiscounts] = useState(0)
  const [TotalsellBeforeDiscounts, setTotalsellBeforeDiscounts] = useState(0)
  const [orderDate_count, setorderDate_count] = useState([])
  const [order_statusCount, setorder_statusCount] = useState([])



  const [status, setStatus] = useState("Todays")
  const [form, setForm] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [dateError, setdateError] = useState("");

  const getTodaysOrders = async () => {

    const res = await fetch(`/gettodaysorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();

    if (data.status === 422 || !res) {
      console.log("error");
    } else {
      //setList(data)
    }
  }
  const getWeeklyOrders = async () => {

    const res = await fetch(`/getweeksorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();

    if (data.status === 422 || !res) {
      console.log("error");
    } else {
      setCoupanCount(data.CoupanCount)
      setOrders(data.Orders)
      setPaymentStatus_count(data.PaymentStatus_count)
      setProductCount(data.ProductCount)
      setTotalsellAfterDiscounts(data.TotalsellAfterDiscounts)
      setTotalsellBeforeDiscounts(data.TotalsellBeforeDiscounts)
      setorderDate_count(data.orderDate_count)
      setorder_statusCount(data.order_statusCount)





    }
  }
  const getMonthlyOrders = async () => {

    const res = await fetch(`/getmonthlyorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();

    if (data.status === 422 || !res) {
      console.log("error");
    } else {
      // setList(data)
    }
  }
  const getCustomOrders = async () => {

    let sd = moment(startDate).format('YYYY/MM/DD')
    let ed = moment(endDate).format('YYYY/MM/DD')

    const res = await fetch(`/getspecificdatesorder/?dates=${sd},${ed}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json();


    if (data.status === 422 || !res) {
      console.log("error");
    } else {
      //setList(data)
    }
  }

  const GenrateReports = () => {
    console.log(status);
    // if (status=="Custom") {
    //     setForm(true)
    // }
    if (status == "Todays") {
      getTodaysOrders()
    } else if (status == "Weekly") {
      getWeeklyOrders();
    } else if (status == "Monthly") {
      getMonthlyOrders();
    } else if (status == "Custom") {
      setForm(true)

    }
  }
  const formStatus = () => {
    if (form == true) {
      setForm(false)
    }
  }
  const Genrate = () => {
    console.log("Genrate");
    console.log(startDate, endDate);
    if (moment(startDate).format('DD-MM') > moment(endDate).format('DD-MM')) {
      console.log("satrtdate");
      setdateError("Please Select Valid Dates")

    } else if (moment(startDate).format('DD-MM') < moment(endDate).format('DD-MM')) {


      console.log("enddate");
      getCustomOrders();
    } else {
      console.log("same");

    }

  }
  console.log(CoupanCount);
  console.log(Orders);
  console.log(PaymentStatus_count);
  console.log(ProductCount);
  console.log(TotalsellAfterDiscounts);
  console.log(TotalsellBeforeDiscounts);
  console.log(orderDate_count);
  console.log(order_statusCount);
  return (

    <div>
      <AdminHeader />

      <div style={{ width: "30rem" }}>

        <div className="filter_gender" style={{ maxWidth: "25rem" }}>

          <div className="filter">
            <h6 style={{ marginTop: "1rem" }}><b>Genrate Report By Selecting Any Option</b></h6>
            <div className="gender d-flex justify-content-between" style={{ marginTop: "1rem" }}>
              <Form.Check
                type={"radio"}
                label={`Todays`}
                name="isActive"
                value={"Todays"}
                onChange={(e) => setStatus(e.target.value)}
                defaultChecked
              />
              <Form.Check
                type={"radio"}
                label={`Weekly`}
                name="isActive"
                value={"Weekly"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Form.Check
                type={"radio"}
                label={`Monthly`}
                name="isActive"
                value={"Monthly"}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Form.Check
                type={"radio"}
                label={`Custom`}
                name="isActive"
                value={"Custom"}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            {
              form == true ?
                ""
                :

                <button onClick={GenrateReports}>Genrate</button>
            }


          </div>

          {
            form == true ?
              <>
                <div className="default-form-box mb-100">
                  <label>Start Date</label>
                  {/* <input type="text" name="first-name" value={changeFname} onChange={(e) => setChangeFname(e.target.value)} /> */}
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                  {/* <div style={{ color: "red" }}>{changeFnameError}</div> */}


                  <label>End Date</label>
                  {/* <input type="text" name="first-name" value={changeFname} onChange={(e) => setChangeFname(e.target.value)} /> */}
                  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>


                <div className="save_button mt-3">
                  <button className="btn btn-md btn-black-default-hover"
                    type="submit" onClick={Genrate}>Genrate</button>
                  <button className="btn btn-md btn-black-default-hover"
                    type="submit" onClick={formStatus}>Cancel</button>
                </div>
              </>
              :
              ""
          }


        </div>
      </div>

      <div style={{ width: "30rem" }}>



      </div>
    </div>
  )
}

export default Reports