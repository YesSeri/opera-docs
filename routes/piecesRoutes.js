const express = require('express');
const axios = require('axios');
const path = require('path');
const router = express.Router();
const db = require('../helper/dbConnection');

router.use(express.json());

router.get('/', (req, res) => {
  const query =   `SELECT p.id as piece_id, p.title, p.type, p.placement, o.name as opera, o.id as opera_id, c.first_name, c.last_name, c.id as composer_id 
                    FROM Pieces as p INNER JOIN Operas as o ON p.opera_id = o.id 
                    INNER JOIN Composers as c ON o.composer_id = c.id
                    ORDER BY opera ASC, p.placement ASC;`
  db.query(query, function (err, result) {
    if (err) console.error(err);
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT p.title, p.description, p.file_title, p.type, p.placement, o.name as opera, c.first_name, c.last_name 
                 FROM Pieces as p INNER JOIN Operas as o ON p.opera_id = o.id 
                 INNER JOIN Composers as c ON o.composer_id = c.id WHERE p.id = ?;`
  db.query(query, id, (err, result) => {
    if (err) console.error(err);
    if (Object.keys(result).length === 0) {
      res.send('');
    } else {
      res.send(result[0]);
    }
  });
});

// router.get('/getfile/:id', (req, res) => {
  // const id = req.params.id;
  // db.query('SELECT * FROM Pieces WHERE id = ?', id, function (err, result) {
    // if (err) console.error(err);
    // const { file_title } = result[0];
    // const file = path.join(__dirname, '..', '/pdfs/', file_title);
    // if (Object.keys(result).length === 0) {
      // res.send('');
    // } else {
      // res.setHeader('Content-Type', 'application/pdf');
      // res.sendFile(file);
    // }
  // });
// });

module.exports = router;
