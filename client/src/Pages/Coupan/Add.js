import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import AdminHeader from '../AdminHeader';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const Add = () => {

  const [coupanName,setCoupanName] = useState("")
  const [coupanNameError,setCoupanNameError] = useState("")
  const [coupanDiscount,setCoupanDiscount] = useState("")
  const [coupanDiscountError,setCoupanDiscountError] = useState("")
  const [selectedIndex, setSelectedIndex] = useState("")
  const navigate = useNavigate()

  const addInputData = async(e) =>{
    e.preventDefault();
    let submit = true
    if (selectedIndex === "") {
        if (coupanName === '') {
            setCoupanNameError("Please Enter Coupan Name")
            submit = false
        } else {
            setCoupanNameError("")
            submit= true;
        }
        if (coupanDiscount === '') {
          setCoupanDiscountError("Please Enter Discount")
          submit = false
      } else {
          setCoupanDiscountError("")
          submit= true;
      }
        if(submit==true){
         
          const res = await fetch("/addcoupan",{
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body:JSON.stringify({
              coupanName,coupanDiscount
            })
          })
          console.log(res);
          const data = await res.json();
          console.log(data);
          if(data.status==422 || !res){
              console.log("error");
          }else if(data.status == 424){
            setCoupanNameError("This Name is Already Exist..!")
          }else{
            setCoupanName("")
            setCoupanDiscount("")
            alert("done")
            navigate("/coupan")
          }
        }
    }

  }
  return (
    <>
    <AdminHeader/>
    
    <form>

<div style={{ width: "80%" }}>
  <Form style={{ marginLeft: "24rem", marginTop: "4rem", marginRight: "10rem" }}>
    
    <Form.Group className="mb-3" controlId="formGroupPassword">
      <Form.Label>Coupan Name</Form.Label>
      <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={coupanName} onChange={(e) => setCoupanName(e.target.value)} placeholder="Enter Coupan Name" name='coupanName'/>
      {coupanNameError}
    </Form.Group>
    

    <Form.Group className="mb-3" controlId="formGroupPassword">
      <Form.Label>Discount(%)</Form.Label>
      <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={coupanDiscount} onChange={(e) => setCoupanDiscount(e.target.value)} placeholder="Enter Coupan Discount" name='coupanDiscount'/>
    {coupanDiscountError}
    </Form.Group>
    <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={addInputData}>Add</Button>{' '}

  </Form>

</div>

</form>
    </>
  )
}

export default Add