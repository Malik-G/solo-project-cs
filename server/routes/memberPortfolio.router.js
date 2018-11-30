const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET all cards of a specific user
router.get('/:id', (req, res) => {
   let userId = req.params.id
   const queryText = 'SELECT username FROM user_auth WHERE id=$1';
   pool.query(queryText, [userId])
     .then((result) => {
         res.send(result.rows);
      })
     .catch((err) => {
         console.log('Error completing GET request', err);
         res.sendStatus(500);
     });
 });

 module.exports = router;