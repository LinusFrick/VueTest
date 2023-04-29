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

productRouter.get('/', async (req, res) => {
    try {
      const products = await mongoose.models.Product.find().exec();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('internal error');
    }
  });

  productRouter.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const { name, description, price, image, type } = req.body;
        console.log('ID:', id);
        console.log('request body:', req.body);
        const updatedProduct = await mongoose.models.Product.findByIdAndUpdate(id, {
            name, description, price, image, type
        });

        if(!updatedProduct){
            res.status(404).send('Product not found')
        } else {
            res.status(200).json(updatedProduct);
        }
    }catch(error){
        console.error(error);
        res.status(500).send('internal error');
    }
  });

  productRouter.delete(`/:id`, async (req, res) => {
    try {
      const ProductId = req.params.id;
      const deletedProduct = await mongoose.models.Product.findByIdAndDelete(ProductId);
  
      if (!deletedProduct) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).json({ message: 'Product deleted', deletedProduct });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  
  
  

module.exports = productRouter;

