import React from "react";
import { Layout } from "../component/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, FormGroup } from "react-bootstrap";

export const CartPage = () => {
  const [auth, setauth] = useAuth();
  const [cart, setcart] = useCart();
  const navigate = useNavigate();

  const removeCartitem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setcart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center ">
              {cart?.length > 1
                ? `You have ${cart.length} items in your cart${
                    auth?.token ? "" : ", please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
          <Container>
            {cart?.map((p) => (
              <Row className="">
                <Col>
                  <Row>
                    <Col className="text-center">
                      <img
                        className="m-2"
                        height={150}
                        variant="top"
                        src={`http://localhost:5000/api/v1/product/get-photo/${p._id}`}
                      />
                    </Col>
                    <Col>
                      <h3>
                        <b>{p.name}</b>
                      </h3>
                      <p>{p.description}</p>
                      <h5>Price :{p.price}</h5>
                      <Button
                        variant="danger"
                        onClick={() => removeCartitem(p._id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col md={4}>Checkout/Payment</Col>
                <hr />
              </Row>
            ))}
          </Container>
        </div>
      </div>
    </Layout>
  );
};
