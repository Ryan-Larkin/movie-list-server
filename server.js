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
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
})
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/movies', moviesController());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Web server listening on ${port}`);
});
