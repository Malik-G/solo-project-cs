const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// UPDATE trade block status and price for specific card
router.put('/', (req, res) =>{
   let dataObj = req.body;
   let queryText = '';
   console.log(dataObj.price)
   if(dataObj.tbBoolean === true){
      queryText = `UPDATE card_info SET trade_block=false WHERE card_id=$1;`;
      pool.query(queryText, [dataObj.cardId])
      .then( (result) => {
         res.sendStatus(200);
      })
      .catch((error) => {
         console.log('***********:', error)  
         res.sendStatus(500);
      })
   }
   else {
      queryText = `UPDATE card_info SET trade_block=true, price=$1 WHERE card_id=$2;`;
      pool.query(queryText, [dataObj.price, dataObj.cardId])
      .then( (result) => {
         res.sendStatus(200);
      })
      .catch((error) => {
         console.log('***********:', error)  
         res.sendStatus(500);
      })
   }
});

module.exports = router;