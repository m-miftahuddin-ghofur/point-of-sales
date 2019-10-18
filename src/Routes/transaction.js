const express = require('express');
const transactionController = require('../Controllers/transaction');

const Router = express.Router();

Router.get ('/', transactionController.transaction);
Router.post ('/', transactionController.transactionDetail);

module.exports = Router;
