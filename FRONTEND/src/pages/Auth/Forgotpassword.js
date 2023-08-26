import React, { useState } from "react";
import { Layout } from "../../component/Layout/Layout";
import { Form, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export const Forgotpassword = () => {
  const [email, setemail] = useState("");
  const [answer, setanswer] = useState("");
  const [newPassword, setnewPassword] = useState("");

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          email,
          answer,
          newPassword,
        }
      );

      if (res.data.success) {
        toast.success("Password reset Successfully!!!");
      } else {
        toast.error("Enter the correct email or Password");
      }
    } catch {
      toast.error("failed to connect with server!!!");
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
          <Form.Label>Enter your nickname</Form.Label>
          <Form.Control
            type="text"
            placeholder="nickname"
            value={answer}
            onChange={(e) => setanswer(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Enter your New Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="newPassword"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Reset</Button>
      </Form>
      <Toaster />
    </Layout>
  );
};
