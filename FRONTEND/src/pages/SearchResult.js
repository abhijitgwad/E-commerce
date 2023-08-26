import React from "react";
import { Layout } from "../component/Layout/Layout";
import { useSearch } from "../context/Search";
import { Container, Row, Col, Button, Card, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const SearchResult = () => {
  const [value, setvalue] = useSearch();
  const navigate = useNavigate();

  const getColumnsForRow = () => {
    let items = value?.results.map((post, index) => {
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
              <Button variant="warning m-1">More</Button>
              <Button variant="outline-success m-2">Add Card</Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return items;
  };

  return (
    <Layout>
      <div className="text-centre">
        <h3>Search Result</h3>
        <h6>
          {value.results.length < 1
            ? "No result found"
            : `Found ${value?.results.length}`}
        </h6>
        <Container>
          <Row xs={1} md={4}>
            {getColumnsForRow()}
          </Row>
        </Container>
      </div>
    </Layout>
  );
};
