const path = require("path");
const fs = require("fs");
// Logger
const pino = require("pino");
const expressPino = require("express-pino-logger");
const logger = process.env.NODE_ENV === "production" ? productionLogger() : developmentLogger();
const expressLogger = expressPino({ logger });

function developmentLogger() {
	return pino({ prettyPrint: true, level: process.env.LOG_LEVEL || "info" });
}
function productionLogger() {
	var time = Math.round(+new Date()/1000);
	const dir = path.join(__dirname, "logs");
	const saveLocation = path.join(dir, `log-${time}`);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
	return require("pino")(pino.destination(saveLocation));
}

module.exports = { expressLogger, logger };
