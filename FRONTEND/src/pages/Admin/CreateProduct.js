import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Layout } from "../../component/Layout/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Adminmenu } from "../../component/Layout/Adminmenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

export const CreateProduct = () => {
  const [auth, setauth] = useAuth();
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setshipping] = useState("");
  const [photo, setphoto] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: auth?.token,
    },
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );

      if (data?.success) {
        setcategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category!!!");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", desc);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/create-product",
        productData,
        config
      );

      if (data?.success) {
        toast.success("Product create successfully!!!");
        navigate("/dashboard/admin/product-list");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error while creating product");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={4} md={3}>
            <Adminmenu />
          </Col>
          <Col xs={6} md={4}>
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setcategory(value);
                  // console.log(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setphoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="textArea"
                  value={desc}
                  placeholder="write Description"
                  className="form-control"
                  onChange={(e) => {
                    setdesc(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter price"
                  className="form-control"
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity"
                  className="form-control"
                  onChange={(e) => {
                    setquantity(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="select Shipping"
                  size="small"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setshipping(value);
                  }}
                >
                  <Option value="1">YES</Option>
                  <Option value="0">NO</Option>
                </Select>
              </div>
              <div className="mb-3">
                <Button className="btn btn-secondary" onClick={handleCreate}>
                  Create Product
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
