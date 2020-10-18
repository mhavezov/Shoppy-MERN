import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutBreadcrumbs from '../components/CheckoutBreadcrumbs';
import { saveShippingDetails } from '../redux/actions/cartActions';

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingDetails } = cart;

  const [address, setAddress] = useState(shippingDetails.address);
  const [city, setCity] = useState(shippingDetails.city);
  const [postCode, setPostCode] = useState(shippingDetails.postCode);
  const [country, setCountry] = useState(shippingDetails.country);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingDetails({ address, city, postCode, country }));
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutBreadcrumbs step1 step2 />
      <h1>Shipping Details</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postCode'>
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your postcode'
            value={postCode}
            required
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter your country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingPage;
