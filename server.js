const app        = require('express')();
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
const morgan     = require('morgan');

const configDB = require('./config/database.js');
const moviesController = require('./controllers/movies.js');

mongoose.connect(configDB.url);

app.options('*', cors());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/movies', cors(), moviesController());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Web server listening on ${port}`);
});
