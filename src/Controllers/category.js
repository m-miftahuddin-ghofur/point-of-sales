const categoryModel = require('../Models/category');
const form = require('../Helpers/form');

module.exports = {
    getCategory: (req, res) => {
        categoryModel
          .getCategory ()
          .then (response => {
            form.success (res, 200, response);
          })
          .catch (error => {
            console.log (error);
            formError.errorPage (res, error);
          });
    },
    getCategoryById: (req, res) => {
        categoryModel
          .getCategoryById (req)
          .then (response => {
            form.success (res, 200, response);
          })
          .catch (error => {
            console.log (error);
            formError.errorPage (res, error);
          });
    },
    postCategory: (req, res) => {
        categoryModel
          .postCategory (req)
          .then (response => {
            form.success(res,200, "Success Add Category!!")
            //res.json(response);
          })
          .catch (error => {
            console.log (error);
            formError.errorPage (res, error);
          });
    },
    deleteCategory: (req, res) => {
        categoryModel
        .deleteCategory (req)
        .then (response => {
            form.success(res,200,"Success Delete Category!");
        }).catch(error=>{
            console.log(error);
            formError.errorPage (res, error);
        })
    },
    updateCategory: (req, res) => {
        categoryModel
        .updateCategory (req)
        .then (response => {
            form.success(res,200,"Success Update Category!");
        }).catch(error=>{
            console.log(error);
            formError.errorPage (res, error);
        })
    }
};