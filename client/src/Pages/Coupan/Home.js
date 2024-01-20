import React, { useEffect, useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AdminHeader from '../AdminHeader';
import Table from 'react-bootstrap/Table';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Home = () => {

  const navigate = useNavigate();
  const [list,setList] = useState([])
  const [search,setSearch] = useState("")

  const addCoupan = () =>{
    navigate("/coupan/add")
  }

  const deletcoupan =async(id)=>{
    const res = await fetch(`/deletecoupan/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type" :"application/json"
      }
    })

    const data = await res.json();
    console.log(data);

    if(data.status == 422 || !res){
      console.log("error");
    }else{
      alert("done")
    }
  }
  const getCoupanData = async() =>{
    const res = await fetch(`/getcoupans/?search=${search}`,{
      method:"GET",
      headers :{
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
    getCoupanData()
  },[search])
  return (
    <>
     <AdminHeader/>
     <button onClick={addCoupan}>Add Coupan</button>
     <input type="search" class="form-control" id="datatable-search-input" placeholder='Enter to search' onChange={(e)=>setSearch(e.target.value)} style={{marginBottom:"2rem",maxWidth:"30rem",marginTop:"1rem"}}/>

     <div style={{ width: "30rem" }}>

        {
          list.length === 0 ? 
          <>
            No Result Found
          </>
          :
          <>
          <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Coupan Name</th>
              <th>Coupan Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {
              list.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.coupanName}</div></td>
                    <td style={{ textAlign: "center" }}><div style={{ marginTop: "2rem" }}>{item.coupanDiscount}</div></td>
                    <td style={{textAlign:"center"}}>


                      <div style={{marginTop:"2rem"}}>
                      <DropdownButton id="dropdown" title={<MoreHorizIcon />}>
                        
                        <Dropdown.Item as="button"><NavLink to={`/editcoupan/${item._id}`}>Edit</NavLink></Dropdown.Item>
                        <Dropdown.Item as="button"><NavLink onClick={() => deletcoupan(item._id)} >Delete</NavLink></Dropdown.Item>
                        
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