const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// fix I found online for a deprecation warning with mongoose promises
mongoose.Promise = global.Promise;

const movieSchema = new Schema({
  apiID    : { type : Number, required : true, unique : true },
  title    : { type : String, required : true },
  poster   : { type : String },
  overview : { type : String, required : true }
});

module.exports = mongoose.model('Movie', movieSchema);
