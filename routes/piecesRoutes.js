const express = require('express');
const axios = require('axios');
const path = require('path');
const router = express.Router();
const pool = require('../utils/database');


router.use(express.json());
router.get('/arias', (req, res) => {
  const query =   `SELECT p.id as piece_id, p.title, p.type, p.placement, o.name as opera, o.id as opera_id, c.first_name, c.last_name, c.id as composer_id 
                    FROM Pieces as p INNER JOIN Operas as o ON p.opera_id = o.id 
                    INNER JOIN Composers as c ON o.composer_id = c.id
                    WHERE p.type = 'aria'
                    ORDER BY opera ASC, p.placement ASC;`
  pool.query(query, function (err, result) {
    if (err) console.error(err);
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT p.title, p.description, p.file_title, p.type, p.placement, o.name as opera, c.first_name, c.last_name 
                 FROM Pieces as p INNER JOIN Operas as o ON p.opera_id = o.id 
                 INNER JOIN Composers as c ON o.composer_id = c.id WHERE p.id = ?;`
  pool.query(query, id, (err, result) => {
    if (err) console.error(err);
    if (Object.keys(result).length === 0) {
      res.send('');
    } else {
      res.send(result[0]);
    }
  });
});

module.exports = router;
