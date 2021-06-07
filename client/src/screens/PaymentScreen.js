import React,{useState} from 'react';
import { Form, Button,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckOutSteps from '../components/CheckOutSteps'; 
import {savePaymentMethod} from '../actions/cartAction';

const PaymentScreen = ({history}) => {
    const cart =useSelector(state=>state.cart); 
    const {shippingAddress} = cart;
    if(!shippingAddress)
    {
        history.push('/shipping');
    }

    const [paymentMethod,setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');

    }
    return (
        <FormContainer>
          <CheckOutSteps step1={true} step2={true} step3={true}/> 
          <h1 className='mt-5'>Payment Method</h1>
          <Form onSubmit={submitHandler}>
              <Form.Group>
                  <Form.Label as='legend' className='mt-5'>Select Method</Form.Label>
                  <Col>
                  <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                  </Col>
              </Form.Group>
              <Button type='submit' variant='primary' className='mt-4'>Continue</Button>
          </Form>
        </FormContainer>
    )
}

export default PaymentScreen
