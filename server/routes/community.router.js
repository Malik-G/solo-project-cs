const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all cards from every user
router.get('/', (req, res) => {
   const queryText = `SELECT ua.id, ua.username, COUNT(ci.card_id)
      FROM user_auth as ua JOIN card_info as ci ON ua.id = ci.user_id
      GROUP BY ua.username, ua.id;`;
   pool.query(queryText)
     .then((result) => {
         res.send(result.rows);
      })
     .catch((err) => {
         console.log('Error completing GET request', err);
         res.sendStatus(500);
     });
 });

module.exports = router;