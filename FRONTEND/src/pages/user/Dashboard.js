import React from "react";
import { Layout } from "../../component/Layout/Layout";
import { Usermenu } from "../../component/Layout/Usermenu";
import { Container, Row, Col } from "react-bootstrap";

export const Dashboard = () => {
  return (
    <Layout title={"User dashboard"}>
      <Container>
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={4} md={3}>
            <Usermenu />
          </Col>
          <Col xs={6} md={4}>
            xs=6 md=4
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
