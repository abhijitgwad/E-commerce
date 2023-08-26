import React from "react";
import { Layout } from "./Layout/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Card, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Productdetail = () => {
  const params = useParams();
  const [products, setproducts] = useState({});
  const [relatedproduct, setrelatedproduct] = useState([]);
  const navigate = useNavigate();

  //get related products
  const getRelatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      setrelatedproduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/single-product/${params.slug}`
      );

      setproducts(data?.product);
      getRelatedProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnsForRow = () => {
    let items = relatedproduct?.map((post, index) => {
      return (
        <Col>
          <Card key={post._id}>
            <Card.Img
              variant="top"
              src={`http://localhost:5000/api/v1/product/get-photo/${post._id}`}
            />
            <Card.Body>
              <Card.Title>{post.name}</Card.Title>
              <Card.Text>{post.category.name}</Card.Text>
              <Card.Text>{post.price}</Card.Text>
              <Card.Text>{post.description.substring(0, 30)}...</Card.Text>
              <Button
                variant="warning m-1"
                onClick={() => navigate(`/product/${post.slug}`)}
              >
                More
              </Button>
              <Button variant="outline-success m-2">Add Card</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return items;
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <h1>product details</h1>
      <Container>
        <Row>
          <Col xs={4} md={6}>
            <Card.Img
              variant="top"
              src={`http://localhost:5000/api/v1/product/get-photo/${products._id}`}
            />
          </Col>
          <Col xs={8} md={6}>
            <h1>
              <b> {products.name} </b>
            </h1>
            <p>Description: {products.description}</p>
            <h4>Price:{products.price}</h4>
            <h3>Category: {products.category?.name}</h3>
            <h6>Quantity:{products.quantity}</h6>
            <Button variant="secondary">Add to Cart</Button>
          </Col>
        </Row>
        <br />
        <hr />
        <br />
        <h1>
          <b>Similar Products</b>
        </h1>
        {relatedproduct.length < 1 ? (
          <h5>No similar product found</h5>
        ) : (
          <Row xs={4} md={3} className="m-5">
            {getColumnsForRow()}
          </Row>
        )}
      </Container>
    </Layout>
  );
};
