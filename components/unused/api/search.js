const express = require("express");
const { logger } = require("../utils/pino");
const router = express.Router();

router.use(express.json());

const pool = require("../utils/database");
router.get("/", (req, res) => {
	const query = `SELECT p.title, p.type, p.id as piece_id, o.name as opera, o.id as opera_id, c.first_name, c.last_name, c.id as composer_id
                    FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
                    INNER JOIN composers as c ON o.composer_id = c.id
                    ORDER BY c.last_name ASC`;
	pool.query(query, function (error, result) {
		if (error) {
			logger.error(error);
			return res.status(500).send({ error: "An error has occurred" });
		}
		res.json(result);
	});
});

module.exports = router;
