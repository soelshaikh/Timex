import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import AdminHeader from '../AdminHeader';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Home = () => {
  
  const [list,setList] = useState([]);
  const [search,setSearch] = useState("");
  const [isActive,setIsActive] = useState("All")
  const [isFeatured,setIsFeatured] = useState("All")
    const navigate = useNavigate();
    const addproduct = () =>{
        navigate("/product/add")
    
    }
    const deleteProduct = async(id) =>{
        const res = await fetch(`deleteproduct/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type":"application/json"
          }
        })     

        const deletedata = await res.json();

        if(res.status==422 || !deletedata){
          console.log("error");
        }else{
          console.log("Product Deleted");
          toast.success("Product Deleted... !")
          getProducts();
        }
    }
    const getProducts = async() =>{
        const product_api  = await fetch(`/getproduct/?search=${search}&isactive=${isActive}&isfeatured=${isFeatured}`,{
          method:"GET",
          headers :{
            "Content-Type" :"application/json"
          }
        })

        const data = await product_api.json();
        console.log(data);
        if(product_api.status === 422 || !data){
          console.log("error");
        }else{
          setList(data)
          console.log(data[0].isActive);
        }
    }

    useEffect(()=>{
        getProducts();
    },[search,isActive,isFeatured])
  return (
    <>
    <AdminHeader></AdminHeader>
    <ToastContainer/>
    <button onClick={addproduct}>Add Product</button>
    <input type="search" class="form-control" id="datatable-search-input" placeholder='Enter to search' onChange={(e)=>setSearch(e.target.value)} style={{marginBottom:"2rem",maxWidth:"30rem",marginTop:"1rem"}}/>

   <div className='flex' style={{display:'flex'}}>
   <div className="filter_gender" style={{maxWidth:"12rem"}}>
              <div className="filter">
                <h6>Filter By Product Status</h6>
                <div className="gender d-flex justify-content-between" style={{marginTop:"1rem"}}>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="isActive"
                    value={"All"}
                    onChange={(e)=>setIsActive(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="isActive"
                    value={"true"}
                    onChange={(e)=>setIsActive(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="isActive"
                    value={"false"}
                    onChange={(e)=>setIsActive(e.target.value)}
                  />
                </div>
              </div>
            </div>

            
   </div>

   <div className="filter_gender" style={{maxWidth:"12rem"}}>
              <div className="filter">
                <h6>Filter By Featured Products</h6>
                <div className="gender d-flex justify-content-between" style={{marginTop:"1rem"}}>
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="isFeatured"
                    value={"All"}
                    onChange={(e)=>setIsFeatured(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Enable`}
                    name="isFeatured"
                    value={"true"}
                    onChange={(e)=>setIsFeatured(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Disable`}
                    name="isFeatured"
                    value={"false"}
                    onChange={(e)=>setIsFeatured(e.target.value)}
                  />
                </div>
              </div>
            </div>
    <div style={{ width: "30rem" }}>


{
  list.length === 0 ? <>
    No Result Found
  </>:
  <>
    <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>#</th>
      <th>Product Image</th>
      <th>Product Name</th>
      <th>Price</th>
      <th>Category</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>

    {
      list.map((item, index) => {
        return (
          <tr>
            <td>{index + 1}</td>
            <td><img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto", height: "100px" }} src={`/uploads/${item.imgpath}`} className='mt-2' /></td>
            <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.product_name}</div></td>
            <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.selling_price}<br></br><s>{item.actual_price}</s></div></td>
            <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.product_category?.catName}</div></td>
            <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{ JSON.stringify(item.isActive)==="false" ? "InActive" : "Active" }</div></td>
            <td style={{textAlign:"center"}}>


              <div style={{marginTop:"2rem"}}>
              <DropdownButton id="dropdown" title={<MoreHorizIcon />}>
                
                <Dropdown.Item as="button"><NavLink to={`/editproduct/${item._id}`}>Edit</NavLink></Dropdown.Item>
                <Dropdown.Item as="button"><NavLink onClick={() => deleteProduct(item._id)} >Delete</NavLink></Dropdown.Item>
                
              </DropdownButton>
              </div>
            </td>

          </tr>
        )
      })


    }
  </tbody>
</Table>
  </>
}

</div>
    </>
  )
}

export default Home