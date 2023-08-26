import React, { useEffect, useState } from "react";
import { Layout } from "../component/Layout/Layout";
import { Container, Row, Col, Button, Card, FormGroup } from "react-bootstrap";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Price } from "../component/Price";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";

export const Homepage = () => {
  const [auth, setauth] = useAuth();
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [checked, setchecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, settotal] = useState(0);
  const [page, setpage] = useState(1);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [cart, setcart] = useCart();

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/product-count"
      );
      settotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setloading(false);
      if (data.success) {
        setproducts(data.products);
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("shmething went wrong!!!");
    }
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
    }
  };

  //getting filtered products
  const getfilterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filter",
        { checked, radio }
      );
      if (data.success) {
        setproducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("error whilte filtering!!!");
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
              <Button
                onClick={() => {
                  setcart([...cart, post]);
                  localStorage.setItem("cart", JSON.stringify([...cart, post]));
                }}
                variant="outline-success m-2"
              >
                Add Card
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return items;
  };

  const handlefiler = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c != id);
    }
    setchecked(all);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) getfilterProduct();
  }, [checked, radio]);

  useEffect(() => {
    if (page == 1) return;
    loadmore();
  }, [page]);

  const loadmore = async () => {
    try {
      setloading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setloading(false);
      setproducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <Layout title={"CampusBuy"}>
      <Container>
        <Row>
          <Col xs={2} md={2}>
            <h3>filter by Categories</h3>
            {categories?.map((c) => (
              <>
                <Checkbox
                  key={c._id}
                  onChange={(e) => handlefiler(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
                <br />
              </>
            ))}
            <hr />
            <h3>Filter by Price</h3>
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
              }}
              value={radio}
            >
              {Price?.map((p) => (
                <Radio value={p.array}>{p.name}</Radio>
              ))}
            </Radio.Group>
            <hr />
            <div>
              <Button variant="danger" onClick={() => window.location.reload()}>
                Reset Filter
              </Button>
            </div>
          </Col>
          <Col xs={12} md={10} className="productCard">
            <h1>Product List</h1>
            {JSON.stringify(radio, null, 4)}
            <Container>
              <Row xs={1} md={4}>
                {getColumnsForRow()}
              </Row>
              <div className="m-2 p-2">
                {products && products.length < total && (
                  <Button
                    variant="warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setpage(page + 1);
                    }}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                )}
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
