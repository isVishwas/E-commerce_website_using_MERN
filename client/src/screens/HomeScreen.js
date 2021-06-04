import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product'
import {useSelector,useDispatch} from "react-redux";
import {listProducts} from '../actions/productAction';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state =>state.productList);
    
    const { loading , error , products } = productList;

    useEffect(() => {
        dispatch(listProducts());   
    },[dispatch]);


    return (
        <div className ='container mt-5 mb-5'>
            <h1 className ='text-center'>Latest Products</h1>
            {
                loading ? (<Loader/>) : error ? (<Message varient="danger">{error}</Message>) : (
                <Row>
                    { products.map(product =>(
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
    
                </Row>   
                )
            }
            
        </div>)
}

export default HomeScreen
