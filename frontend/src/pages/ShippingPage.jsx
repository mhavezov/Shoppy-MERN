import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutBreadcrumbs from '../components/CheckoutBreadcrumbs';
import { saveShippingDetails } from '../redux/actions/cartActions';

const ShippingPage = ({ history }) => {
  // const cart = useSelector((state) => state.cart);
  // const { shippingDetails } = cart;

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postCode, setPostCode] = useState('');
  const [country, setCountry] = useState('');

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
            name='address'
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
            name='city'
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
            name='postCode'
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
            name='country'
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
