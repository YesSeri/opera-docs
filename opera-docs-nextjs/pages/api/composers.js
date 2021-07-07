const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

const { logger } = require("../utils/pino");
router.use(express.json());

router.get("/", (req, res) => {
	const query = `SELECT DISTINCT c.last_name, c.first_name, c.id
                  FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
                  INNER JOIN composers as c ON o.composer_id = c.id
                  ORDER BY c.last_name
                 `;
	pool.query(query, (error, result) => {
		if (error) {
			logger.error(error);
			return res.status(500).send({ error: "An error has occurred" });
		}
		res.status(200).json(result);
	});
});

router.get("/:last_name", (req, res) => {
	const last_name = req.params.last_name.replace("_", " ");
	const query = `SELECT o.name as opera, o.id as opera_id, c.first_name, c.last_name 
                  FROM operas as o 
                  INNER JOIN composers as c 
                  ON o.composer_id = c.id WHERE c.last_name = ?`;
	pool.query(query, last_name, (error, result) => {
		if (error) {
			logger.error(error);
			return res.status(500).send({ error: "An error has occurred" });
		}
		res.json(result);
	});
});

module.exports = router;
