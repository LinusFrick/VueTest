const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const express = require('express');
const cartRouter = express.Router();

const CartItemSchema = new Schema({
    product : {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: Number,
});

const CartSchema = new Schema({
    items: [CartItemSchema],
});

const Cart = mongoose.model('Cart', CartSchema);


cartRouter.post('/', async(req, res) => {
try{
    const newCart = new mongoose.models.Cart({items: [] });
    await newCart.save();
    res.status(201).json(newCart);
}catch(error){
    console.error(error);
    res.status(500).send('internal server error');
    }
});

cartRouter.get('/:id', async (req, res) => {
    try{
        const cart = await Cart.findById(req.params.id).populate('items.product');

        if(cart) {
            res.status(200).json(cart);
        }else{
            res.status(404).send('cart not found')
        }
    }catch(error){
        console.error(error)
        res.status(500).send('internval server error');
    }
});



module.exports = cartRouter;