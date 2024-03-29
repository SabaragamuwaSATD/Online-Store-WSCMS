import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card, ListGroupItem} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer} from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { 
    useGetOrderDetailsQuery, 
    usePayOrderMutation, 
    useGetPayPalClientIdQuery, 
    useDeliverOrderStatusMutation
} from '../slices/ordersApiSlice';

import React from 'react'

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch,  isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading:loadingPay}] = usePayOrderMutation();

    const [ deliverOrder, { isLoading:loadingDeliver} ] = useDeliverOrderStatusMutation();

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const { data:paypal, isLoading: loadingPayPal, error: errorPayPal} = useGetPayPalClientIdQuery();

    const { userInfo} = useSelector((state) => state.auth);

    useEffect(() => {
        if(!errorPayPal && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id':paypal.clientId,
                        currency:'USD',
                    }
                });
                paypalDispatch({tyep: 'setLoadingStatus', value: 'pending'});
            }
            if( order && !order.isPaid){
                if( !window.paypal){
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    function onApprove(data, actions){
        return actions.order.capture().then(async function(details){
            try {
                await payOrder({orderId, details});
                refetch();
                toast.success('Payment successfull');
            } catch (err) {
                toast.error(err?.data?.message || err.message); 
            }
        });

    }

    async function onApproveTest(){
        await payOrder({orderId, details: { payer: {} }});
        refetch();
        toast.success('Payment successfull');
    }

    function onError(err){
        toast.error(err.message);
    }
    
    function createOrder(data, actions){
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Processing');
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }
 
    return isLoading ? <Loader/> : error ? <Message variant='danger'/> 
    :(
        <>
            <h1>Order Details</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                                {order.shippingAddress.distric}, {order.shippingAddress.postalCode}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                 order is { order.orderStatus}
                                </Message>
                            ) : (
                                <Message variant='danger'>Pending...</Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>
                                    Paid on { order.paidAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} * Rs.{item.price} = Rs.{item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>Rs.{order.itemsPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs.{order.shippingPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs.{order.taxPrice}</Col>
                                </Row>

                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs.{order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader/>} 

                                    {isPending ? <Loader/> : (
                                        <div>
                                            {/* <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button> */}
                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroupItem>
                            )}
                            
                            {loadingDeliver && <Loader/>}

                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroupItem>
                                    <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverOrderHandler}>
                                        Accept Order
                                    </Button>
                                    <br/><br/>
                    
                                </ListGroupItem>
                                
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen