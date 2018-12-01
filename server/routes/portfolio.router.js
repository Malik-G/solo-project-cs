const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET all cards of a specific user
router.get('/:id', (req, res) => {
   let userId = req.params.id
   const queryText = 'SELECT * FROM card_info WHERE user_id=$1';
   pool.query(queryText, [userId])
     .then((result) => {
         res.send(result.rows);
      })
     .catch((err) => {
         console.log('Error completing GET request', err);
         res.sendStatus(500);
     });
 });

// POST a new card to the db
router.post('/', (req, res) => {
   //const newProject = req.body;
   const queryText = `INSERT INTO card_info (user_id, sport, athlete, team, card_brand, trade_block, price, details, image_url)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
   const queryValues = [
      req.body.user,
      req.body.sport,
      req.body.athlete,
      req.body.team,
      req.body.cardBrand,
      req.body.tradeBlock,
      req.body.price,
      req.body.details,
      req.body.url,
   ];
   pool.query(queryText, queryValues)
   .then((result) => {
         res.sendStatus(201);
      })
   .catch((err) => {
      console.log('Error POSTing to db:', err);
      res.sendStatus(500);
   });
});

// DELETE a specific card from the db... Uses req.query instead of req.params
router.delete('/delete/', (req, res) => {
   //console.log(req.query);
   const queryText = 'DELETE FROM card_info WHERE card_id=$1';
   pool.query(queryText, [req.query.id])
      .then(() => {
         res.sendStatus(200);
      })
      .catch((err) => {
         console.log('Error completeing DELETE from db', err);
         res.sendStatus(500);
      });
   });

// PUT information changes for a specific card
router.put('/edit/:id', (req, res) =>{
   let reqId = req.params.id;
   let dataObj = req.body;
   let queryText = '';
   let noImageArr = [dataObj.sport, dataObj.athlete, dataObj.team, dataObj.card_brand, dataObj.details, reqId];
   let imageArr = [dataObj.sport, dataObj.athlete, dataObj.team, dataObj.card_brand, dataObj.details, dataObj.url, reqId];
   
   if(dataObj.url === ''){
       queryText = `UPDATE card_info SET sport=$1, athlete=$2, team=$3, card_brand=$4, 
                  details=$5 WHERE card_id=$6;`;
      pool.query(queryText, noImageArr)
       .then( (result) => {
           res.sendStatus(200);
       })
       .catch((error) => {
         console.log('***********:', error)  
         res.sendStatus(500);
       })
   }
   else {
      queryText = `UPDATE card_info SET sport=$1, athlete=$2, team=$3, card_brand=$4, 
      details=$5, image_url=$6 WHERE card_id=$7;`;
      pool.query(queryText, imageArr)
       .then( (result) => {
           res.sendStatus(200);
       })
       .catch((error) => {
           res.sendStatus(500);
       })
   }
})

module.exports = router;