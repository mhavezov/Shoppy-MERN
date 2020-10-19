import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../redux/actions/orderActions';
import { ORDER_PAY_RESET } from '../redux/constants';

const OrderPage = ({ match }) => {
  const dispatch = useDispatch();

  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientID } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (order.isPaid === false) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order# {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping to:</h2>
              <p>
                <span style={{ fontWeight: 'bold' }}>Name: </span>
                <span style={{ fontStyle: 'italic' }}>{order.user.name}</span>
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Email: </span>
                <span style={{ fontStyle: 'italic' }}>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </span>
              </p>

              <p>
                <span style={{ fontWeight: 'bold' }}>Adress: </span>
                <span style={{ fontStyle: 'italic' }}>
                  {order.shippingDetails.address}, {order.shippingDetails.city},{' '}
                  {order.shippingDetails.postCode},{' '}
                  {order.shippingDetails.country}
                </span>
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <span style={{ fontWeight: 'bold' }}>Pay with: </span>
                <span style={{ fontStyle: 'italic' }}>
                  {order.paymentMethod}
                </span>
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>You have no orders</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = {'\u20AC'}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>
                      {'\u20AC'}
                      {order.itemsPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping cost :</Col>
                  <Col>
                    {order.shippingPrice !== 0 ? (
                      <span
                        style={{ fontWeight: 'bold' }}
                      >{`\u20AC${order.shippingPrice}`}</span>
                    ) : (
                      'free'
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>VAT:</Col>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>
                      {'\u20AC'}
                      {order.taxPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>
                      {'\u20AC'}
                      {order.totalPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              {order.isPaid === false && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {sdkReady === false ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
