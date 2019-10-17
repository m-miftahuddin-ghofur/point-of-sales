const express = require('express');
const product = require('./product');
const category = require('./category');

const Router = express.Router();

Router.use ('/category', category);
Router.use ('/product', product);

module.exports = Router;
