if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const path = require("path");

// Express
const express = require("express");
const app = express();

// Utils
const compression = require("compression");
const { expressLogger, logger } = require("./utils/pino");

if (process.env.NODE_ENV === "production") app.use(expressLogger);

app.use(compression());

app.use("/api/pieces", require("./routes/piecesRoutes.js")); // Each of these routes are used to find stuff for the client. The client connects locally to these.
app.use("/api/composers", require("./routes/composersRoutes.js"));
app.use("/api/operas", require("./routes/operaRoutes.js"));
app.use("/api/search", require("./routes/searchRoutes.js"));

if (process.env.NODE_ENV === "production") {
	// If this is in production, then we need to use react as a static thing, instead of in the client folder.
	const folder = path.join(__dirname, "client", "build");
	app.use(express.static(path.join(folder)));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(folder, "index.html"));
	});
} else {
	app.get("*", (req, res) => {
		res.json({ "Not valid": "This route doesn't exist" });
	});
}

const port = process.env.PORT || 5000; // If there is a PORT env variable it chooses that, else it chooses port 5000
app.listen(port, () => logger.info(`Server listening at port ${port}`));
