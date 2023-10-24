import React from "react";
import { Form, Row, Col, Card, Button, ListGroupItem } from "react-bootstrap";

const ContactUs = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <Form action="/contact-us" method="POST">
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" />
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email address" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" placeholder="Enter your message here" />
            </Form.Group>
          </Col>
        </Row><br></br>
        <Row>
          <Col md={12}>
            <Button type="submit" variant="primary">Send Message</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContactUs;

