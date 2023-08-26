import React from "react";
import { Layout } from "../../component/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { Usermenu } from "../../component/Layout/Usermenu";

export const Profile = () => {
  return (
    <Layout>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={4} md={3}>
            <Usermenu />
          </Col>
          <Col xs={6} md={4}>
            <h1>Create Product</h1>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
