import React,{useEffect} from 'react';
import {
  Row,
  Button,
  Col,
  Image,
  ListGroup,
  Card,
  Container
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {createOrder} from '../actions/orderAction';

const PlaceOrderScreen = ({history}) => {
  const cart = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const { address, city, postalCode, country } = shippingAddress;

  cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2);
  
  cart.shippingPrice = cart.itemsPrice>500?0:50;
  cart.taxPrice = Number(0.15*cart.itemsPrice).toFixed(2); 
  cart.totalPrice = (Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2);
  
const orderCreate = useSelector(state=>state.orderCreate);
const {order,success,error,loading} = orderCreate;


useEffect(()=>{
  if(success)
  {
    history.push(`/order/${order?._id}`);
  }

},[history,success,order?._id])


  const placeOrderHandler = (e)=>{

    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod:cart.paymentMethod,
      itemsPrice:cart.itemsPrice,
      shippingPrice:cart.shippingPrice,
      taxPrice:cart.taxPrice,
      totalPrice:cart.totalPrice
    }));

  }
  return (
    <Container>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row className='mt-5 mb-5'>
        <Col>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>
                  <b>Shipping</b> :{' '}
                </strong>
                {address},{city},{postalCode},{country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>
                  <b>Method</b> :{' '}
                </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        {console.log('item:', item)}
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
                            {item.qty} x &#8377; {item.price} = &#8377;
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varient='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#8377; {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#8377; {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>&#8377; {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#8377; {cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

             
    {error &&  <ListGroup.Item><Message variant='danger'>{error}</Message></ListGroup.Item>}
              

        {loading &&<ListGroup.Item> <Loader/></ListGroup.Item>}
              
                
              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cart.cartItems.length===0}
                onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
