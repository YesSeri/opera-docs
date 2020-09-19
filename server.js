if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const piecesRoutes = require('./routes/piecesRoutes.js');
const composersRoutes = require('./routes/composersRoutes.js');
const operaRoutes = require('./routes/operaRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');

if (process.env.NODE_ENV !== 'production') { // Only enable cors in development. For security this is better.
  app.use(cors());
}

app.use('/api/pieces', piecesRoutes); // Each of these routes are used to find stuff for the client. The client connects locally to these.
app.use('/api/composers', composersRoutes);
app.use('/api/operas', operaRoutes);
app.use('/api/search', searchRoutes);

if (process.env.NODE_ENV === 'production') { // If this is in production, then we need to use react as a static thing, instead of in the client folder. 
  const folder = path.join(__dirname, 'client', 'build');
  app.use(express.static(path.join(folder)));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(folder, 'index.html'));
  });
}

const port = process.env.PORT || 5000; // If there is a PORT env variable it chooses that, else it chooses port 5000
app.listen(port, () => console.log(`READServer listening at port ${port}`));
