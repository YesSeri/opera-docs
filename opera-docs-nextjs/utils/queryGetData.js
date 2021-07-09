const pool = require("./database");

export default async function queryGetData(query, param) {
	const [res] = await pool.query(query, param);
	const data = res.map((el) => {
		let obj = {};
		for (const key in el) {
			obj = { ...obj, [key]: el[key] }
		}
		return obj
	})
	return data;
}