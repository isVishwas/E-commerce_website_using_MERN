import React,{useEffect} from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Container
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderDetails} from '../actions/orderAction';

const OrderScreen = ({match}) => {

    const orderId =match.params.id;


  const dispatch = useDispatch();
  
  const orderDetails = useSelector(state => state.orderDetails);
  const {order,error,loading} = orderDetails;

  if(!loading)
  {
    order.itemsPrice = order.orderItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2); 
  }

useEffect(()=>{
  
  dispatch(getOrderDetails(orderId));

},[dispatch,orderId])


  return loading ?(<Loader/>):error?(<Message variant='danger'>{error}</Message>):(
    <Container className='mt-5 mb-5'>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>
                  <b>Shipping : </b> 
                </strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
              </p>
              {order.isDelivered?<Message variant='success'>Delivered on {order.deliveredAt}</Message>:
              (<Message variant='danger'>Not Delivered</Message>)
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>
                  <b>Method : </b> 
                </strong>
                {order.paymentMethod}
              </p>

              {order.isPaid?<Message variant='success'>Paid on {order.paidAt}</Message>:
              (<Message variant='danger'>Not Paid</Message>)
              }
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => {
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
                  <Col>&#8377; {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#8377; {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>&#8377; {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#8377; {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default OrderScreen;
