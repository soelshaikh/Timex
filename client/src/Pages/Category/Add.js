import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import AdminHeader from '../AdminHeader';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import axios from "axios"
const Add = () => {

  const navigate = useNavigate();
  const [catName, setCatName] = useState("")
  const [catNameError, setCatNameError] = useState("")
  const [cimage, setCategoryImage] = useState("")
  const [selectedIndex, setSelectedIndex] = useState("")
  const [cimageError, setCategoryImageError] = useState("")
  const addInputData = async(e) => {
    e.preventDefault();

    console.log(catName,cimage);
    let submit = true
        if (selectedIndex === "") {
            if (catName === '') {
                setCatNameError("Please Enter Category Name")
                submit = false
            } else {
                setCatNameError("")
                submit= true;
            }
            if(submit==true){
              var formData = new FormData();
              formData.append("photo",cimage);
              formData.append("catName",catName)
              console.log(formData);
              
                          const config = {
                            headers :{
                              "Content-Type" :"multipart/form-data"
                            }
                          }

              const api_call = await axios.post("/addcategory",formData,config);

              // console.log(api_call.status);
              if(api_call.status==422 || !api_call){
                  console.log("error");
              }else{
                setCatName("")
                alert("done")
                navigate("/category")
              }
            }
        }


  }
  return (

    <>
      <AdminHeader></AdminHeader>
      <form>

      <div style={{ width: "80%" }}>
        <Form style={{ marginLeft: "24rem", marginTop: "4rem", marginRight: "10rem" }}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Category Icon</Form.Label>
            <Form.Control type="file" onChange={(e) => setCategoryImage(e.target.files[0])} placeholder="" name='photo'/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="Enter Category Name" name='catName'/>
          </Form.Group>

          <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={addInputData}>Add</Button>{' '}

        </Form>

      </div>
  
      </form>
      
    </>

  )
}

export default Add