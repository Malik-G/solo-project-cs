const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


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

// GET all cards from every user
router.get('/', (req, res) => {
   const queryText = 'SELECT * FROM card_info';
   pool.query(queryText)
     .then((result) => {
         res.send(result.rows);
      })
     .catch((err) => {
         console.log('Error completing GET request', err);
         res.sendStatus(500);
     });
 });


router.post('/', (req, res) => {

});

module.exports = router;