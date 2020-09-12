if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors')

const piecesRoutes = require('./routes/piecesRoutes.js');
const composersRoutes = require('./routes/composersRoutes.js');
const operaRoutes = require('./routes/operaRoutes.js');

app.use(cors())
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'build')));
}

app.use('/api/pieces', piecesRoutes);
app.use('/api/composers', composersRoutes);
app.use('/api/operas', operaRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`READServer listening at port ${port}`));
