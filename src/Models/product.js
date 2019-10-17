const connection = require('../Configs/connect');
const category = require('./category')

const pagination = (req) => {
    const limit = 3 ;
    const page = req.query.page || 1;
    const offset = limit * (page-1);
    
    //console.log(limit);
    
    return {limit, offset};
}

const sortBy = (req, sql) => {
    if (req.query.sortby) {
        if(req.query.sortby == "name"){
            sql += 'ORDER by products.name ';
        }else if (req.query.sortby =="category") {
            sql += 'ORDER by category.category ';
        }else if (req.query.sortby =="updated") {
            sql += 'ORDER by products.date_updated ';
        }
        if (req.query.order == 'ascending') {
            sql += 'ASC';
        }else if (req.query.order == 'descending') {
            sql += 'DESC';
        }
    };
    return sql;
}

module.exports = {
    getProduct: (req) => {
        return new Promise ((resolve,reject) => {
            let sql = 'SELECT products.id, products.name, products.discription, products.image, category.category, products.price, products.quantity, products.date_added, products.date_updated FROM products , category WHERE products.category_id=category.id ';
            const page = pagination(req);
            sql = sortBy(req, sql);
            //console.log(sql);
            connection.query (sql + ' LIMIT ? OFFSET ?' ,
                [page.limit, page.offset],
                (err, response) => {
                   console.log(sql);
                if (!err){
                    resolve(response);
                }else{
                    reject (err);
                }
            });
        });
    },
    postProduct: req => {
        return new Promise ((resolve, reject) => {
          const body = req.body;
          connection.query('SELECT id FROM category WHERE id=? ',
          [body.id],
          (err,response)=> {
                if (response.length > 0){
                    connection.query (
                        'INSERT INTO products SET name=?, discription=?, image=?, category_id=?, price=?, quantity=? ',
                        [body.name, body.discription, body.image, body.category_id, body.price, qty.quantity],
                        (err, response) => {
                            if (!err) {
                                resolve (response);
                            } else {
                                reject (err);
                            }
                        }
                    );                    
                }else{
                    reject (err);
                }
          },)                   
        });
    },
    deleteProduct: req => {
        return new Promise ((resolve, reject) => {
          const params = req.params;
          connection.query (
            'DELETE FROM products WHERE id=?',
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
    updateProduct: req => {
        return new Promise ((resolve, reject) => {
            category.getCategoryById (req)
            .then (response => {
                //form.success (res, 200, response);
                //console.log(response, "controller_update_product");
                if(response.length>0) {
                    const params = req.params;
                    const body = req.body;
                    connection.query (
                        'UPDATE products SET name=?, discription=?, image=?, category_id=?, price=?, quantity=? WHERE id=?',
                        [body.name, body.discription, body.image, body.category_id, body.price, body.quantity, params.id],
                        (err, response) => {
                            if (!err) {
                                resolve (response);
                            } else {
                                reject (err);
                            }
                        }
                    );
                }else{
                    reject ('Id category Not Found!');
                }
            })
            .catch (error => {
                console.log (error, 'Cath controller update product');
            });
          
            // const params = req.params;
            // const body = req.body;
            // connection.query (
            //     'UPDATE products SET name=?, discription=?, image=?, category_id=?, price=?, quantity=? WHERE id=?',
            //     [body.name, body.discription, body.image, body.category_id, body.price, body.quantity, params.id],
            //     (err, response) => {
            //     if (!err) {
            //         resolve (response);
            //     } else {
            //         reject (err);
            //     }
            //     }
            // );
        });
    },
    searchProduct: (req) => {
        return new Promise ((resolve,reject) => {
            connection.query ('SELECT * FROM products WHERE name LIKE ?', 
            ['%' + req.query.name +'%'],
            (err, response) => {
                if (!err){
                    resolve(response);
                }else{
                    reject (err);
                }
            });
        });
    },
    //addqty
    addQuantity: (req) => {
        return new Promise ((resolve,reject) => {
            const body = req.body;
            let sql = 'UPDATE products SET quantity=quantity+? WHERE id=? ';
            connection.query (sql,
            [body.quantity , body.id],
            (err,response) => {
                // console.log(body.quantity,body.id);
                if (!err) {
                    resolve (response);
                }else{
                    reject (err);
                }
            })
        })
    },
    reduceQuantity: (req) => {
        return new Promise ((resolve, reject) => {
            const body = req.body;
            let sql = 'UPDATE products SET quantity=if(quantity - ? < 0 or quantity = 0 , quantity , quantity - ? ) WHERE id=?'
            connection.query (sql,
            [body.quantity , body.quantity , body.id],
            (err,response) => {
                // if(!err && body.quantity >= 0 ) {
                if(!err) {
                    resolve(response);
                }else{
                    reject (err);
                }
            }
            )
        }
        )
    }

}