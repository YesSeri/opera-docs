const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../helper/dbConnection');

router.use(express.json());

router.get('/', (req, res) => {
  const query = `SELECT DISTINCT c.last_name, c.first_name, c.id
                  FROM Pieces as p INNER JOIN Operas as o ON p.opera_id = o.id 
                  INNER JOIN Composers as c ON o.composer_id = c.id
                  ORDER BY c.last_name
                 `;
  db.query(query, (err, result) => {
    if (err) console.error(err);
    res.status(200).json(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT o.name as opera, o.id as opera_id, c.first_name, c.last_name 
                  FROM Operas as o 
                  INNER JOIN Composers as c 
                  ON o.composer_id = c.id WHERE c.id = ?`;
  db.query(query, id, (err, result) => {
    res.json(result);
  });
});

module.exports = router;
