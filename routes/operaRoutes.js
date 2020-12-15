const { resolveNaptr } = require('dns');
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../helper/dbConnection');

router.use(express.json());

router.get('/', (req, res) => {
  // Show all operas, sort by name
  const query = `SELECT o.name as opera, o.id as opera_id, c.last_name FROM Operas as o 
     INNER JOIN Composers as c 
     ON c.id = o.composer_id 
     ORDER BY opera`;
  db.query(query, function (err, result) {
    if (err) console.error(err);
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const query = `SELECT p.id, p.title, p.type, p.placement, o.name, opera_id, c.last_name
  FROM Pieces as p INNER JOIN Operas as o ON p.opera_id = o.id 
  INNER JOIN Composers as c ON o.composer_id = c.id
     WHERE o.id = ? ORDER BY p.placement ASC;`

  const id = req.params.id;
  db.query(query, id, (err, result) => {
    if (err) console.error(err);

    if (result.length === 0) {
      // Returns string instead of result to stop client from crashing when it recieves null or undefined.
      res.json('');
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
