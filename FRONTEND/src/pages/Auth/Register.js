import React from "react";
import { useState } from "react";
import { Layout } from "../../component/Layout/Layout";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState();
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();
    console.log(name, email, password, address);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { name, password, address, phone, email, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong!!!");
    }
  }

  return (
    <Layout>
      <Form className="register" onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="mobile number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Enter your nickname</Form.Label>
          <Form.Control
            type="text"
            placeholder="answer"
            value={answer}
            onChange={(e) => setanswer(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
      <Toaster />
    </Layout>
  );
};
