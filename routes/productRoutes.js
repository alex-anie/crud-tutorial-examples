const express = require('express');
const router = express.Router();
const Product = require('../models/productModels.js')
const {
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct
} = require('../controllers/productController.js')

//get all products
router.get('/', getProducts)

// get a single product
router.get('/:id', getProduct)

// create a product
router.post('/', createProduct)

// update a product
router.put('/:id', updateProduct)

// 
router.delete('/:id', deleteProduct)

module.exports = router;