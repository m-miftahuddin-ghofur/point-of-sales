const transactionModel = require('../Models/transaction');
const form = require('../Helpers/form');

module.exports = {
    transaction : (req,res) => {
    transactionModel
      .transaction (req)
      .then (response => {
        form.success (res, 200, response);
      })
      .catch (error =>{
        console.log (error);
      })
    },
    transactionDetail : (req,res) => {
        transactionModel
          .transactionDetail (req)
          .then (response => {
            form.success (res, 200, response);
          })
          .catch (error =>{
            console.log (error);
          })
        }
}