import React, { useState } from "react";
import { Layout } from "../../component/Layout/Layout";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/auth";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();

  async function handlesubmit(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" onClick={() => navigate("/forgot-password")}>
          Forgot Password
        </Button>
        <br />
        <Button type="submit">Login</Button>
      </Form>
      <Toaster />
    </Layout>
  );
};
