import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import AdminHeader from '../AdminHeader';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {

  const navigate = useNavigate()
  const [catName, setCatName] = useState("")
  const [catNameError, setCatNameError] = useState("")
  const [selectedIndex, setSelectedIndex] = useState("")

  const { id } = useParams("");

  const getData = async () => {

    const res = await fetch(`/getcategory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("error")
    } else {
      setCatName(data.catName)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const updatecategory = async (e) => {
    e.preventDefault();

    let submit = false;

    if (selectedIndex === "") {

      if (catName == "") {
        submit = false;
        setCatNameError("Enter Category Name")
      } else {
        submit = true
        setCatNameError("")
      }
    }
    if (submit == true) {
      console.log("sohil");
      const api = await fetch(`/updatecategory/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          catName
        })
      })

      const datares = await api.json();
      console.log(datares);

      if (api.status == 422 || !datares) {
        alert("fill the data");
      } else {
        navigate("/category")
        console.log("data added");
      }

    }
  }

  return (
    <>
      <AdminHeader></AdminHeader>
      <form>

        <div style={{ width: "80%" }}>
          <Form style={{ marginLeft: "24rem", marginTop: "4rem", marginRight: "10rem" }}>
            {/* <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Category Icon</Form.Label>
              <Form.Control type="file" onChange={(e) => setCategoryImage(e.target.files[0])} placeholder="" name='photo' />
            </Form.Group> */}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" class="form-control" value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="Enter Category Name" name='catName' />
            </Form.Group>

            <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={updatecategory}>Update</Button>{' '}

          </Form>

        </div>

      </form>
    </>
  )
}

export default Edit