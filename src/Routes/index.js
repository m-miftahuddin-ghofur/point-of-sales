const express = require('express');
const product = require('./product');
const category = require('./category');
const transaction = require ('./transaction');
const Router = express.Router();

Router.use ('/category', category);
Router.use ('/product', product);
Router.use ('/transaction', transaction);

module.exports = Router;
