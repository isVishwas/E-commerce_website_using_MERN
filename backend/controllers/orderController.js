import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc Create new order
// Post /api/orders
//Private

const addOrderItems = asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body;

    if(orderItems && orderItems.length===0)
    {
        res.status(400);
        throw new Error('no order items');
        
    }
    else
    {
        const order  =new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
 }) 

 //@desc Create new order
// Post /api/orders/:id
//Private

 const getOrderById =asyncHandler(async(req,res)=>{
     const order = await Order.findById(req.params.id).populate('user','name email');

     if(order)
     {
         res.json(order)
     }
     else
     {
         res.status(400);
         throw new Error('order not found');
     }

 })

 export {addOrderItems,getOrderById};