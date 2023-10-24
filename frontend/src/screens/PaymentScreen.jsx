import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col , Image} from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';


const PaymentScreen = () => {

    const [ paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(()=> {
        if(!shippingAddress){
            navigate('/shipping');
        }
    } , [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    } 

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={ submitHandler }>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label><br/>
                <Col>
                    <Form.Check
                    type='radio'
                    className='my-2'
                    label='PayPal'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onchange={(e) => setPaymentMethod(e.target.value)}><Image src={`./images/paypal.png`} style={{height:'20px'}}/>PayPal
                     </Form.Check>
                </Col>
            </Form.Group><br/>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen