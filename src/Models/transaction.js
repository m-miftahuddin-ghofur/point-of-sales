const connection = require('../Configs/connect');

module.exports = {
    transaction : () => {
        return new Promise ((resolve, reject) => {
            //let insertDetail = 'INSERT INTO detail_transaction (transaction_id,product_id,quantity) VALUES (?,?,?) ';
            
            let insertTrans = 'INSERT INTO transaction VALUES () ';
            //let checkQty = "SELECT id FROM transaction WHERE transaction_id=?";
            let dataTrans = [];
            connection.query ( insertTrans, dataTrans ,
                (err,response)=> {
                    if(!err){
                        resolve (response);
                    }else{
                        reject (err);
                    }
                } )

        })
    },
    transactionDetail : req => {
        return new Promise ((resolve, reject) => {
                let insertDetail = 'INSERT INTO detail_transaction (transaction_id,product_id,quantity) VALUES (?,?,?) ';
                
                //let insertTrans = 'INSERT INTO transaction VALUES () ';
                //let checkQty = "SELECT id FROM transaction WHERE transaction_id=?";
                let dataTrans = [req.params.transaction_id, req.body.product_id,req.body.quantity];
                connection.query ( insertDetail, dataTrans ,
                    (err,response)=> {
                        if(!err){
                            resolve (response);
                        }else{
                            reject (err);
                        }
                    } 
                )
        })
    },
    getTransaction : req => {
        return new Promise ((resolve,reject) => {
            connection.query ( 'SELECT * FROM detail_transaction WHERE transaction_id=? ',
            [req.params.transaction_id],
            (err,response) => {
                if(!err){
                    resolve (response);
                }else{
                    reject (err);
                }
            })
        })        
    }
}