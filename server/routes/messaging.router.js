const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all messages sent to the user (i.e. inbox)
router.get('/inbox', (req, res) => {
   const sqlQuery = `SELECT ua.id, ua.username, COUNT(ci.card_id)
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

 // GET all messages that the user sent to others (i.e. outbox)
router.get('/outbox', (req, res) => {
   const sqlQuery = `SELECT ua.id, ua.username, COUNT(ci.card_id)
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