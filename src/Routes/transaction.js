const express = require('express');
const transactionController = require('../Controllers/transaction');

const Router = express.Router();

Router.get ('/:transaction_id', transactionController.getTransaction);
Router.post ('/', transactionController.transaction);
Router.post ('/:transaction_id', transactionController.transactionDetail);

module.exports = Router;
