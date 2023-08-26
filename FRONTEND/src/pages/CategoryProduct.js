import React, { useState, useEffect } from "react";
import { Layout } from "../component/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CategoryProduct = () => {
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const getAllCategoryProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-category/${params.slug}`
      );
      setproducts(data?.products);
      setcategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnsForRow = () => {
    let items = products?.map((post, index) => {
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
    if (params?.slug) getAllCategoryProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <p>{category?.name}</p>
      <h2>{products?.length} result found</h2>
      <Container>
        <Row xs={1} md={4}>
          {getColumnsForRow()}
        </Row>
      </Container>
    </Layout>
  );
};
