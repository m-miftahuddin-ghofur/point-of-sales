const productModel = require('../Models/product');
const form = require('../Helpers/form');

module.exports = {
    getProduct: (req, res) => {
        productModel
          .getProduct (req)
          .then (response => {
            form.success (res, 200, response);
          })
          .catch (error => {
            console.log (error);
          });
    },
    postProduct: (req, res) => {
        productModel
          .postProduct (req)
          .then (response => {
            form.success(res,200, "Succes Add Product!!")
            //res.json(response);
          })
          .catch (error => {
            console.log (error);
          });
    },
    deleteProduct: (req, res) => {
        productModel
        .deleteProduct (req)
        .then (response => {
            form.success(res,200,"Delete Product Succesfully!");
        }).catch(error=>{
            console.log(error);
        })
    },
    updateProduct: (req, res) => {
        productModel
        .updateProduct (req)
        .then (response => {
            form.success(res,200,"update Product Sucessfully!");
        }).catch(error=>{
            console.log(error);
        })
    },
    searchProduct: (req, res) => {
        productModel
          .searchProduct (req)
          .then (response => {
            form.success (res, 200, response);
          })
          .catch (error => {
            console.log (error);
          });
    },
    addQuantity: (req,res) => {
      productModel
        .addQuantity (req)
        .then (response => {
          form.success (res, 200, response);
        })
        .catch (error =>{
          console.log (error);
        })
    },
    reduceQuantity: (req,res) => {
      productModel
        .reduceQuantity (req)
        .then (response => {
          form.success (res, 200, response);
        })
        .catch (error =>{
          console.log (error);
        })
    }
}