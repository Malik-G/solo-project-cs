const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
   let userId = req.params.id
   const queryText = `SELECT wl.watch_list_owner, ua.username as card_owner, ci.*
   FROM watch_list as wl 
   JOIN card_info as ci ON ci.card_id=wl.id_of_card
   JOIN user_auth as ua ON ua.id=ci.user_id
   WHERE wl.watch_list_owner=$1;`
   pool.query(queryText, [userId])
     .then((result) => {
         res.send(result.rows);
      })
     .catch((err) => {
         console.log('Error completing GET request', err);
         res.sendStatus(500);
     });
 });

module.exports = router