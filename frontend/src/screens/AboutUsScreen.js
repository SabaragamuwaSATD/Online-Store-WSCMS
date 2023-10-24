import React from "react";
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const AboutUsScreen = () => {
  return (
    <div>
      <h1>About Us</h1>
      <ListGroup variant="flush">
        <Row>
            <Col md={5}>
            <Card><Image src="/images/aboutus.jpg" alt="About Us" /></Card>
            </Col>
            <Col md={7}>
            <p> 
                    We are a technology-focused company specializing in the distribution and management of tech products for online stores. Our mission is to provide efficient solutions for businesses in the tech industry. With our expertise, cutting-edge warehouse systems, and customer-centric approach, we ensure quick and reliable product delivery. We're committed to sustainability and invite you to join us in shaping the future of tech distribution and warehousing. Thank you for choosing us as your tech partner.
            </p>
            <ul>
                <li>We are experts in our field</li>
                <li>We are dedicated to our clients</li>
                <li>We have a proven track record of success</li>
                <li>We are committed to helping our clients achieve their goals</li>
            </ul>
            <Link to={`/contactus`}><Button variant="primary">Contact</Button></Link>
            </Col>
        </Row>
    </ListGroup>
      <Row>
        <Col md={12}>
            <br></br>
          <h2>Testimonials</h2>
          <ListGroup>
            <ListGroupItem>
              <q>
                "I was very impressed with the quality of service I received from <b>Arrow Computers</b>. They were professional, efficient, and helped me to achieve my goals." - <b>G.I Joe</b>
              </q>
            </ListGroupItem>
            <ListGroupItem>
              <q>
                "<b>Arrow Computers</b> is the best company I have ever worked with. They are always willing to go the extra mile, and they always deliver on their promises." - <b>Fransis</b>
              </q>
            </ListGroupItem>
            <ListGroupItem>
              <q>
                "I was very impressed with the quality of service I received from <b>Arrow Computers</b>" - <b>Rathnakumara</b>            
              </q>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsScreen;
