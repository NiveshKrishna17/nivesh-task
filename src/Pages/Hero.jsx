import React, { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="hero-section bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-lg-1 order-2">
              <h1 className="display-4 mb-4">Nivesh Dev Task</h1>
              <p className="lead mb-4">
                {" "}
                This assignment is designed to gauge your skills and give us an
                idea of how you approach tasks relevant to the Frontend
                Developer.
              </p>
              <Button variant="primary" onClick={() => navigate("/register")}>
                Explore
              </Button>
            </Col>
            <Col lg={6} className="order-lg-2 order-1">
              <img
                className="img-fluid rounded"
                src="https://via.placeholder.com/600x400"
                alt="Hero Image"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}
