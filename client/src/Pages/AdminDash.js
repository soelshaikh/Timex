import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {NavLink} from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';

import { LoginContext } from '../components/ContextProvider/Context';


const AdminDash = () => {

  const { logindata, setLoginData } = useContext(LoginContext);
  
  const navigate = useNavigate();

  const DashboardValid = async () => {

    let token = localStorage.getItem("usersdatatoken");
    console.log(token);
    const res = await fetch("http://localhost:5000/validuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    });


    const data = await res.json();
    console.log(data);
    if (data.status == 401 || !data) {
        console.log("User Not verify");
        navigate("/login")
    } else if (data.status === 201) {
        console.log("admin verify");
        setLoginData(data)
        navigate("/admin");
    }
    else {
        console.log("user verify");
        setLoginData(data)
        navigate("/");
    }
}
useEffect(() => {

  DashboardValid()
  console.log("spe");
  
  // setTimeout(() => {
  //     window.location.reload()
  // }, 8640000);
},[])


  return (
    <>
      <AdminHeader></AdminHeader> 

      <Container>
 <Row style={{marginTop:"10px"}}>
        <Col sm={3}><Card style={{ width: '18rem' , marginLeft:"2rem" ,height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Categorys</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
         
        </Card.Text>
        <NavLink to={"/category"}>Add Category</NavLink>
        
      </Card.Body>
    </Card></Col>
        

    <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Product</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        
        <NavLink to={"/product"}>Add Product</NavLink>
       
      </Card.Body>
    </Card></Col>

    <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Coupan</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        <NavLink to={"/coupan"}>Add Coupan</NavLink>
       
      </Card.Body>
    </Card></Col>

    
    <Col sm={3}><Card style={{ width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Orders</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        <NavLink to={"/orders"}>Orders</NavLink>
       
      </Card.Body>
    </Card></Col>
    <Col sm={3}><Card style={{marginTop:"2rem", width: '18rem',marginLeft:"2rem",height:"12rem" ,backgroundColor:"#475953"}}>
      <Card.Body>
        <Card.Title style={{color:"white"}}>Reports</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
          
        </Card.Text>
        <NavLink to={"/report"}>report</NavLink>
       
      </Card.Body>
    </Card></Col>

    
      </Row>

      <Row style={{marginTop:"10px"}}>
      </Row> 



      
    </Container>
    </>
  )
}

export default AdminDash


