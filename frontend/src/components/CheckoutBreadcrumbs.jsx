import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutBreadcrumbs = ({ step1, step2, step3, step4 }) => {
  return (
    <Breadcrumb>
      {step1 ? (
        <LinkContainer to='/login'>
          <Breadcrumb.Item>Sign In</Breadcrumb.Item>
        </LinkContainer>
      ) : (
        <Breadcrumb.Item active>Sign In</Breadcrumb.Item>
      )}
      {step2 ? (
        <LinkContainer to='/shipping'>
          <Breadcrumb.Item>Shipping</Breadcrumb.Item>
        </LinkContainer>
      ) : (
        <Breadcrumb.Item active>Shipping</Breadcrumb.Item>
      )}
      {step3 ? (
        <LinkContainer to='/payment'>
          <Breadcrumb.Item>Payment</Breadcrumb.Item>
        </LinkContainer>
      ) : (
        <Breadcrumb.Item active>Payment</Breadcrumb.Item>
      )}
      {step4 ? (
        <LinkContainer to='/placeorder'>
          <Breadcrumb.Item>Place Order</Breadcrumb.Item>
        </LinkContainer>
      ) : (
        <Breadcrumb.Item active>Place Order</Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default CheckoutBreadcrumbs;
