const express = require('express');
const productController = require('../Controllers/product');

const Router = express.Router();

Router.get ('/', productController.getProduct);
Router.post ('/', productController.postProduct);
Router.delete('/:id', productController.deleteProduct);
Router.put('/:id', productController.updateProduct);
Router.patch ('/add', productController.addQuantity);
Router.patch ('/reduce', productController.reduceQuantity);

Router.get('/search', productController.searchProduct);

module.exports = Router;
