const express = require('express')
const productRouter = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    type: {
        type: String,
        enum: ['pizza', 'drink', 'aside']
    }
});
mongoose.model('Product', ProductSchema);


productRouter.post('/', async(req, res) => {
    const { name, description, price, image, type } = req.body;
    const newProduct = new mongoose.models.Product({
        name,
        description,
        price,
        image,
        type
    });
    await newProduct.save();
    res.status(201).json(newProduct);
});

productRouter.get('/', async(req, res) => {
    try {
        const products = await mongoose.models.Product.find();
        res.json(products);
    }catch(error){
        console.error(error);
        res.status(500).send('internal error');
    }
});

module.exports = productRouter;

