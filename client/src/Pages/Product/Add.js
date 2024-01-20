import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import AdminHeader from '../AdminHeader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Add = () => {

    const [product_name, setProductName] = useState("")
    const [imgpath, setImagePath] = useState("")
    const [selling_price, setSellingPrice] = useState("")
    const [actual_price, setActualPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [description, setDescription] = useState("")
    const [product_category, setProductCategory] = useState("63fb2a4951915d055dc7446d")
    const [product_categoryError, setProductCategoryError] = useState("")
    const [countInStock, setCountInStock] = useState("")
    const [isFeatured, setIsFeatured] = useState(false)
    const [isActive, setIsActive] = useState(false)


    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getCategoryData = async () => {
        const res = await fetch("/getcategory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(res);
        const category_data = await res.json();
        console.log(category_data);
        if (res.status == 422 || !category_data) {
            console.log("Error");
        } else {
            setList(category_data)
        }
    }

    const addProduct = async(e) => {
        e.preventDefault();

        if (imgpath == "") {
            toast.error("Please Select Product Image")
        } else if (product_name == "") {
            toast.error("Please Enter Product Name")
        } else if (selling_price == "") {
            toast.error("Please Enter Selling Price")
        } else if (actual_price == "") {
            toast.error("Please Enter Actual Price")
        } else if (discount == "") {
            toast.error("Please Enter Discount")
        } else if (description == "") {
            toast.error("Please Enter Product Description")
        } else if (product_category == "") {
            toast.error("Please Select Product Category ")
        } else if (countInStock == "") {
            toast.error("Please Enter Stock ")
        } else {
           
            var formData = new FormData();
            formData.append("photo",imgpath);
            formData.append("product_name",product_name);
            formData.append("selling_price",selling_price);
            formData.append("actual_price",actual_price);
            formData.append("discount",discount);
            formData.append("description",description);
            formData.append("product_category",product_category);
            formData.append("countInStock",countInStock);
            formData.append("isFeatured",isFeatured);
            formData.append("isActive",isActive);

            
            const config = {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }

            const res = await axios.post("/addproduct",formData,config)
            

            if(res.status==422 || !res){
                console.log("error");
            }else{
                setImagePath("")
                setProductName("")
                setSellingPrice("")
                setActualPrice("")
                setDiscount("")
                setDescription("")
                setProductCategory("")
                setCountInStock("")
                setIsFeatured("")
                setIsActive("")
                toast.success("Product Added Succesfully");
                setTimeout(() => {
                    navigate("/product")
                }, 5000)
                
            }

        }

    }

    useEffect(() => {
        getCategoryData()
    }, [])

    return (
        <>
            <AdminHeader></AdminHeader>
            <form>
                <ToastContainer />

                <div style={{ width: "80%" }}>
                    <Form style={{ marginLeft: "24rem", marginTop: "4rem", marginRight: "10rem" }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control type="file" onChange={(e) => setImagePath(e.target.files[0])} placeholder="" name='photo' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={product_name} onChange={(e) => setProductName(e.target.value)} placeholder="Enter Product Name" name='product_name' />
                        </Form.Group>
                        <div style={{ display: 'flex' }}>
                            <Form.Group className="mb-3" style={{ width: "10rem" }}>
                                <Form.Label>Selling Price</Form.Label>
                                <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={selling_price} onChange={(e) => setSellingPrice(e.target.value)} placeholder="Enter Selling Price" name='selling_price' onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3" style={{ width: "10rem", marginLeft: "2rem" }}>
                                <Form.Label>Actual Price</Form.Label>
                                <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={actual_price} onChange={(e) => setActualPrice(e.target.value)} placeholder="Enter Actual Price" name='actual_price' onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3" style={{ width: "10rem", marginLeft: "2rem" }}>
                                <Form.Label>Discount</Form.Label>
                                <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="Enter Discount" name='discount' onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Desciption" name='description' />
                        </Form.Group>

                        <div style={{ display: "flex" }}>
                            <Form.Group className="mb-3" >
                                <label for="exampleInputUsername1">Product Category</label>
                                <select value={product_category} onChange={(e) => setProductCategory(e.target.value)} selected name='product_category' class="form-control" style={{ marginTop: "0.5rem", width: "8rem" }} >
                                    {
                                        list.map((item, index) => {
                                            return (
                                                <>
                                                    <option value={item._id} >{item.catName}</option>
                                                </>
                                            )
                                        })
                                    }
                                    <div style={{ color: "red" }}>{product_categoryError}</div>
                                </select>

                            </Form.Group>
                            <Form.Group className="mb-5" style={{ marginLeft: "0rem" }}>
                                <Form.Label>countInStock</Form.Label>
                                <Form.Control type="text" class="form-control" id="exampleInputUsername1" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder="Enter Stock" name='countInStock' style={{ width: "8rem", marginLeft: "0.7rem" }} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formGroupPassword">
                                <label for="exampleInputUsername1">Featured</label>
                                <select value={isFeatured} onChange={(e) => setIsFeatured(e.target.value)} selected name='isFeatured' class="form-control" style={{ width: "8rem", marginTop: "0.5rem", marginLeft: "0.7rem" }}>

                                    <>
                                        <option value="false">Disable</option>
                                        <option value="true">Enable</option>
                                    </>


                                </select>

                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <label for="exampleInputUsername1">Active & Inactive</label>
                                <select value={isActive} onChange={(e) => setIsActive(e.target.value)} selected name='isActive' class="form-control" style={{ width: "8rem", marginTop: "0.5rem", marginLeft: "0.7rem" }}>

                                    <>
                                        <option value="false">Inactive</option>
                                        <option value="true">Active</option>
                                    </>


                                </select>

                            </Form.Group>
                        </div>

                        <Button variant="primary" style={{ width: "17rem", marginLeft: "8rem" }} onClick={addProduct}>Add</Button>{' '}

                    </Form>

                </div>

            </form>

        </>

    )
}

export default Add