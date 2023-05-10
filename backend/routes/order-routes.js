const express = require('express')
const orderRouter = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    orderdate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', OrderSchema);


orderRouter.post('/', async (req, res)  => {
    const { cart, user, orderdate } = req.body;
    if(!cart || !user){
        return res.status(400).json({ message: 'cart and user required' })
    }

    try{
        const order = new Order({
            user: user._id,
            cart: cart.map(item => ({
                product: item.productId,
                quantity: item.quantity,

            })),
            orderdate: Date.now(),
        });
        const savedOrder = await order.save();
        return res.status(201).json({ message: 'order received', orderId: savedOrder._id });
    }catch(error){
        console.error('error placing order', error);
        return res.status(500).json({ message: 'error during order placement' })
    }
});

// orderRouter.get('/', async (req, res) => {
//     try {
//         const orders = await Order.find().populate('user').populate('cart.products');
//         res.json(orders);
//     }catch(error){
//         console.error('error getting orders', error)
//         res.status(500).json({ message: 'error getting orders' });
//     }
// });

orderRouter.get('/', async (req, res)  => {
    try {
      const orders = await Order.find().populate('user', 'username');
      return res.status(200).json(orders);
    } catch (error) {
      console.error('error fetching orders', error);
      return res.status(500).json({ message: 'error fetching orders' });
    }
  });
  


module.exports = orderRouter;