const connection = require('../Configs/connect');

module.exports = {
    getCategory: () => {
    return new Promise ((resolve,reject) => {
        connection.query ('SELECT * FROM category', (err, response) => {
            if (!err){
                resolve(response);
            }else{
                reject (err);
            }
        });
    });
    },
    getCategoryById:  req => {
        return new Promise ((resolve,reject) => {
            
            connection.query('SELECT * FROM category WHERE id=?',
            [req.params.category_id || req.body.category_id ],
            (err,response) => {
                if (!err) {
                   resolve(response);     
                }else{
                    reject ('Id Not Found!');
                }
            } 
            )
        })
    },
    postCategory: req => {
        return new Promise ((resolve, reject) => {
          const body = req.body;
          connection.query (
            'INSERT INTO category SET category=?',
            [body.category],
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
              }
            }
          );
        });
    },
    deleteCategory: req => {
        return new Promise ((resolve, reject) => {
          const params = req.params;
          connection.query (
            'DELETE FROM category WHERE id=?',
            [params.id],
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
              }
            }
          );
        });
    },
    updateCategory: req => {
        return new Promise ((resolve, reject) => {
          const params = req.params;
          const body = req.body;
          connection.query (
            'UPDATE category SET category=? WHERE id=?',
            [body.category, params.id],
            (err, response) => {
              if (!err) {
                resolve (response);
              } else {
                reject (err);
              }
            }
          );
        });
    },

};