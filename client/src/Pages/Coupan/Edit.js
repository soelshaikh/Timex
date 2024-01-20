import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import AdminHeader from '../AdminHeader';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';


const Edit = () => {

  const [coupanName,setCoupanName] = useState("")
  const [coupanNameError,setCoupanNameError] = useState("")
  const [coupanDiscount,setCoupanDiscount] = useState("")
  const [coupanDiscountError,setCoupanDiscountError] = useState("")
  const [selectedIndex, setSelectedIndex] = useState("")
  const navigate = useNavigate()
  const [list,setList] = useState("")

  const {id} = useParams("")
  const getData = async()=>{
    const res = await fetch(`/getcoupan/${id}`,{
      method:"GET",
      headers:{
        "Content-Type" :"application/json"
      }
    })

    const data = await res.json();
    if(data.status === 422 || !res){
      console.log("error");
    }else{
      setCoupanName(data.coupan.coupanName)
      setCoupanDiscount(data.coupan.coupanDiscount)
    }
  }

  const updatecoupan = async() =>{
    console.log(coupanName,coupanDiscount);
    const res = await fetch(`/updatecoupan/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type" :"application/json"
        },body: JSON.stringify({
          coupanName,coupanDiscount
        })
      })

      console.log(res);
      const data = await res.json();

      if(data.status==422 || !res){
        console.log("error");
      }else{
        alert("done")
        navigate("/coupan")

      }
  }

  useEffect(()=>{
    getData()
  },[])

  
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
    <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={updatecoupan} >Update</Button>{' '}

  </Form>

</div>

</form>
    
    </>
  )
}

export default Edit