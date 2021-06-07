import React, { useEffect } from 'react'
import { Row, Col, Card, Image, ListGroup, ListGroupItem, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartAction'
import Message from '../components/Message'
const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id;
    
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
   
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;


    useEffect(() => {
        dispatch(addToCart(productId,qty))
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler=()=>{
       history.push('/login?redirect=shipping');
    }

    return (
        <Row className='container mt-5 ml-3'>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message> Your cart is empty <Link to="/">Go Back</Link></Message> : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md="2">
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md="3">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md="2">&#8377; {item.price}</Col>
                                    <Col md="2">
                                        <Form.Control as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value))).then(res => console.log("res:", res))}
                                        >
                                            {[...Array(item.countInStock).keys()].map(x => <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>)}
                                        </Form.Control>

                                    </Col>
                                    <Col md="2">
                                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}> <i className="fas fa-trash"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc,item)=>acc + item.qty,0)}) Items</h2>
                            &#8377;   {cartItems.reduce((acc,item)=>acc+item.qty *item.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.length===0}
                            onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen

