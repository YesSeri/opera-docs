const pool = require("./database");

export default async function queryGetData(query, param) {
	const [res] = await pool.query(query, param);
	return res;
}
