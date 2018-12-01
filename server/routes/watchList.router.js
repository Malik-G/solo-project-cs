const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
   //use req.user.id
   let userId = req.params.id
   const queryText = `SELECT wl.watch_list_owner, wl.watch_list_id, ua.username as card_owner, ci.*
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

router.post('/update', (req, res) => {
   let dataObj = req.body
   let queryText = `INSERT INTO watch_list (watch_list_owner, id_of_card)
   VALUES ($1, $2);`
   pool.query(queryText, [dataObj.watch_list_owner, dataObj.id_of_card])
   .then((result) => {
         res.sendStatus(201);
      })
   .catch((err) => {
      console.log('Error POSTing to db:', err);
      res.sendStatus(500);
   });
});

router.delete('/delete/', (req, res) => {
   //console.log(req.query);
   const queryText = 'DELETE FROM watch_list WHERE watch_list_id=$1';
   pool.query(queryText, [req.query.id])
      .then(() => {
         res.sendStatus(200);
      })
      .catch((err) => {
         console.log('Error completeing DELETE from db', err);
         res.sendStatus(500);
      });
});

module.exports = router