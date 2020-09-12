const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../helper/dbConnection');

router.use(express.json());

router.get('/', (req, res) => {
  const query =   `SELECT p.id, p.title, p.type, p.placement, o.name as opera, c.first_name, c.last_name 
                    FROM Pieces_test as p INNER JOIN Operas as o ON p.opera_id = o.id 
                    INNER JOIN Composers as c ON o.composer_id = c.id
                    ORDER BY opera ASC, p.placement ASC;`
  db.query(query, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = `SELECT p.title, p.description, p.type, p.placement, o.name as opera, c.first_name, c.last_name 
                 FROM Pieces_test as p INNER JOIN Operas as o ON p.opera_id = o.id 
                 INNER JOIN Composers as c ON o.composer_id = c.id WHERE p.id = ?;`
  db.query(query, id, (err, result) => {
    if (err) throw err;
    if (Object.keys(result).length === 0) {
      res.send('');
    } else {
      res.send(result[0]);
    }
  });
});

router.get('/getfile/:id', (req, res) => {
  const fileFolder = path.join(__dirname, '..', '/pdfs/');
  const id = req.params.id;
  db.query('SELECT * FROM Pieces_test WHERE id = ?', id, function (err, result) {
    if (err) throw err;
    const { fileTitle } = result[0];
    if (Object.keys(result).length === 0) {
      res.send('');
    } else {
      res.setHeader('Content-Type', 'application/pdf');
      res.sendFile(fileFolder + fileTitle);
    }
  });
});

module.exports = router;
