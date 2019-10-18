const express = require('express');
const categoryController = require('../Controllers/category');

const Router = express.Router();

Router.get ('/', categoryController.getCategory);
Router.get ('/:id', categoryController.getCategoryById);
Router.post ('/', categoryController.postCategory);
Router.delete('/:id', categoryController.deleteCategory);
Router.put('/:id', categoryController.updateCategory);

module.exports = Router;
