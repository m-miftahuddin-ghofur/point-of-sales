const connection = require('../Configs/connect');
const category = require('./category')

const pagination = (req) => {
    const limit = Number(req.query.perpage) || 10 ;
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
            connection.query (sql + ' LIMIT ? OFFSET ?' ,
                [page.limit, page.offset],
                (err, response) => {
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
          [body.category_id],
          (err,response)=> {
                if (response.length > 0){
                    let sql = 'INSERT INTO products SET name=?, discription=?, image=?, category_id=?, price=?, quantity=? ';
                    //let sql = 'INSERT INTO products (name, description, quantity, image, category_id, price) SELECT ?, ?, ?, ?, ?, ? WHERE EXISTS (SELECT * FROM category WHERE id=?)';
                    let data =  [body.name, body.discription, body.image, body.category_id, body.price, body.quantity];
                    connection.query (sql, data,
                        (err, response) => {
                            if (!err) {
                                resolve (response);
                            } else {
                                reject (err);
                            }
                        }
                    );                    
                }else{
                    reject ('Category Id Not Found');
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
            const body = req.body;
            connection.query ('SELECT * FROM category WHERE id=? ', 
            [body.category_id],
            (err,response) => {
                if(!err){
                    if(response.length>0) {
                        const params = req.params;
                        const body = req.body;
                      
                        let sql = 'UPDATE products SET name=?, discription=?, image=?, category_id=?, price=?, quantity=? WHERE id=?'; 
                        let data = [body.name, body.discription, body.image, body.category_id, body.price, body.quantity, params.id];
                      
                        connection.query (sql, data,
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
                }else{
                    reject(err);
                }
            },)                   
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
                console.log(body.quantity,body.id);
                if (!err) {
                    resolve (response);
                }else{
                    reject (err);
                }
            })
        })
    },
    reduceQuantity: req => {
        return new Promise ((resolve, reject) => {
          const body = req.body;
         
          connection.query('SELECT quantity FROM products WHERE id=? ',
          [body.id],
          (err,response) => {
                if (!err) {
                    if (response[0].quantity >= body.quantity){ 
                        let sql = 'UPDATE products SET quantity = quantity - ?  WHERE id=? ';
                        let data =  [body.quantity , body.id];
                        connection.query (sql, data,
                            (err, response) => { 
                                if (!err) {
                                    resolve (response);
                                } else {
                                    reject (err);
                                }
                            }
                        );                    
                    }else{
                        reject ("Quantity Out Of Stock!!");
                    }
                }else{
                    reject(err);
                }
          },)                   
        });
    }

}