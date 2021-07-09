const pool = require("../utils/database");
const { logger } = require("../../../utils/pino");

export default function handler(req, res) {
	// Show all operas, sort by name
	const query = `SELECT o.name as opera, o.id as opera_id, c.last_name FROM operas as o 
     INNER JOIN composers as c 
     ON c.id = o.composer_id 
     ORDER BY opera`;
	pool.query(query, function (error, result) {
		if (error) {
			logger.error(error);
			return res.status(500).send({ error: "An error has occurred" });
		}
		res.json(result);
	});
};
