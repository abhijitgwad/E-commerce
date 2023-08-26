import React from "react";
import { Layout } from "../../component/Layout/Layout";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Adminmenu } from "../../component/Layout/Adminmenu";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProductsList = () => {
  const [products, setproducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product`
      );
      if (data?.success) {
        toast.success("successfully fetch list of product!!!");
        setproducts(data.product);
        console.log(products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!!");
    }
  };

  const getColumnsForRow = () => {
    let items = products.map((post, index) => {
      return (
        <Link
          to={`/dashboard/admin/update-product/${post.slug}`}
          className="productLink"
        >
          <Col>
            <Card key={post._id}>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/api/v1/product/get-photo/${post._id}`}
              />
              <Card.Body>
                <Card.Title>{post.name}</Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Text>{post.category.name}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Link>
      );
    });
    return items;
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={4} md={3}>
            <Adminmenu />
          </Col>
          <Col xs={6} md={9} className="productCard">
            <h1>Product List</h1>
            <Container>
              <Row xs={1} md={4}>
                {getColumnsForRow()}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
