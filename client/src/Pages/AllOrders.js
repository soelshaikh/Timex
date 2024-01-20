import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AdminHeader from '../Pages/AdminHeader';
import Table from 'react-bootstrap/Table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from "moment";
import Form from 'react-bootstrap/Form';

const AllOrders = () => {

    const [list,setList] = useState([])
    const [status,setStatus] = useState("All")
    const getAllOrders = async() =>{

        const res = await fetch(`/getallorders/?status=${status}`,{
            method:"GET",
            headers:{
                "Content-Type" :"application/json"
            }
        })

        const data = await res.json();

        if(data.status === 422 || !res){
            console.log("error");
        }else{
            setList(data)
        }
    } 

    useEffect(()=>{
        getAllOrders()
    },[status])

    console.log(list);
  return (
    <>
    <AdminHeader/>
   
    <div style={{ width: "30rem" }}>

    <div className="filter_gender" style={{maxWidth:"12rem"}}>
              <div className="filter">
                <h6>Filter By Order Status</h6>
                <div className="gender d-flex justify-content-between" style={{marginTop:"1rem"}}>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="isActive"
                    value={"All"}
                    onChange={(e)=>setStatus(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`processing`}
                    name="isActive"
                    value={"processing"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`confirmed`}
                    name="isActive"
                    value={"confirmed"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                   <Form.Check
                  type={"radio"}
                  label={`shipped`}
                  name="isActive"
                  value={"shipped"}
                  onChange={(e)=>setStatus(e.target.value)}
                />
                  
                   <Form.Check
                  type={"radio"}
                  label={`deliverd`}
                  name="isActive"
                  value={"deliverd"}
                  onChange={(e)=>setStatus(e.target.value)}
                />
                 <Form.Check
                    type={"radio"}
                    label={`cancel`}
                    name="isActive"
                    value={"cancel"}
                    onChange={(e)=>setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>

       <Table striped bordered hover size="sm">
         <thead>
           <tr>
            <th>#</th>
             <th>Date</th>
             <th>#order id</th>
             <th>Amount</th>
             <th>status</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>

           {
             list.map((item, index) => {
               return (
                 <tr>
                   <td>{index + 1}</td>
                   <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{moment(item.orderDate).format("L")}</div></td>
                   <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}><NavLink>#{item._id}</NavLink></div></td>
                   <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.totalAmount}</div></td>
                   <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.orderStatus}</div></td>
                   
                   <td style={{textAlign:"center"}}>


                     <div style={{marginTop:"2rem"}}>
                     <DropdownButton id="dropdown" title={<MoreHorizIcon />}>
                       
                       <Dropdown.Item as="button"><NavLink to={`/orderi/${item._id}`}>Edit</NavLink></Dropdown.Item>
                       {/* <Dropdown.Item as="button"><NavLink  >Delete</NavLink></Dropdown.Item> */}
                       
                     </DropdownButton>
                     </div>
                   </td>

                 </tr>
               )
             })


           }
         </tbody>
       </Table>

     </div>

   
   </>
  )
}

export default AllOrders