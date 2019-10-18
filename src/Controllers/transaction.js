const transactionModel = require('../Models/transaction');
const form = require('../Helpers/form');
const formError = require('../Helpers/formerror');

module.exports = {
    transaction : (req,res) => {
    transactionModel
      .transaction (req)
      .then (response => {
        form.success (res, 200, response);
      })
      .catch (error =>{
        console.log (error);
        formError.errorPage (res, error);
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
            formError.errorPage (res, error);
          })
    },
    getTransaction : (req,res) => {
      transactionModel
        .getTransaction (req)
        .then (response => {
          form.success (res, 200, response);
        })
        .catch (error =>{
          console.log (error);
          formError.errorPage (res, error);
        })
      }
}