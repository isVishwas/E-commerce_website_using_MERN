import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps'; 
import {saveShippingAddress} from '../actions/cartAction';

const ShippingScreen = ({ location, history }) => {

  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({address,city,postalCode,country}));
    history.push("/payment");


    
  };

  return (
    <FormContainer>
        <CheckOutSteps step1={true} step2={true}/>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter address'
            value={address}
            onChange={e => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='enter city'
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='postal code'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='country'
            value={country}
            onChange={e => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' varient='primary'>
          Continue
        </Button>
      </Form>

    </FormContainer>
  );
};

export default ShippingScreen;
