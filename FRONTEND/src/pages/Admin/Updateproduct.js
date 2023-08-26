import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Layout } from "../../component/Layout/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Adminmenu } from "../../component/Layout/Adminmenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

export const Updateproduct = () => {
  const [auth, setauth] = useAuth();
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setshipping] = useState("");
  const [photo, setphoto] = useState("");
  const [id, setid] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const config = {
    headers: {
      Authorization: auth?.token,
    },
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/single-product/${params.slug}`
      );

      if (data.success) {
        setname(data.product.name);
        setid(data.product._id);
        setdesc(data.product.description);
        setcategory(data.product.category);
        setquantity(data.product.quantity);
        setprice(data.product.price);
        setshipping(data.product.shipping);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", desc);
      productData.append("price", price);
      productData.append("category", category._id);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/product/update-product/${id}`,
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
      toast.error("error while updating product");
    }
  };

  const handleDelete = async () => {
    alert("Sadf");
    let ans = window.prompt("Are you sure to delete!!!");
    if (!ans) return;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/product/delete-product/${id}`,
        config
      );
      if (data.success) {
        toast.success("product deleted!!!");
        navigate("/dashboard/admin/product-list");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while deleting product!!");
    }
  };

  useEffect(() => {
    getSingleProduct();
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
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setcategory(value);
                }}
                value={category.name}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:5000/api/v1/product/get-photo/${id}`}
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
                  value={shipping ? "yes" : "no"}
                >
                  <Option value="1">YES</Option>
                  <Option value="0">NO</Option>
                </Select>
              </div>
              <div className="mb-3">
                <Button className="btn btn-secondary" onClick={handleUpdate}>
                  Update Product
                </Button>
                <hr />
                <Button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
