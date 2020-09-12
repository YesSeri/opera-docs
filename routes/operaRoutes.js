const { resolveNaptr } = require('dns');
const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../helper/dbConnection');

router.use(express.json());

router.get('/', (req, res) => {
  // Show all operas, sort by name
  db.query('SELECT id, name as opera FROM Operas ORDER BY opera', function (
    err,
    result
  ) {
    if (err) throw err;
    res.json(result)
  });
});

router.get('/:id', (req, res) => {
  const query =
    'SELECT o.name, p.title, p.placement, p.id FROM Pieces_test as p INNER JOIN Operas as o ON o.id = p.opera_id WHERE o.id = ? ORDER BY p.placement ASC;';
  const id = req.params.id;
  db.query(query, id, (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      res.json("")
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
