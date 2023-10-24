import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#22577A' }} className="text-white"> {/* Apply Bootstrap background color class */}
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>Arrow Computers &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;