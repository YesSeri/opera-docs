const pool = require("../utils/database");
const { logger } = require("../../../utils/pino");

export default function handler(req, res) {
	const query = `SELECT p.id, p.title, p.type, p.placement, o.name, opera_id, c.last_name
  FROM pieces as p INNER JOIN operas as o ON p.opera_id = o.id 
  INNER JOIN composers as c ON o.composer_id = c.id
     WHERE o.id = ? ORDER BY p.placement ASC;`;

	const { id } = req.query;
	pool.query(query, id, (error, result) => {
		if (error) {
			logger.error(error);
			return res.status(500).send({ error: "An error has occurred" });
		}
		if (result.length === 0) {
			// Returns string instead of result to stop client from crashing when it recieves null or undefined.
			res.json("");
		} else {
			res.json(result);
		}
	});
};