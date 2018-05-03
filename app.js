require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const Schema       = mongoose.Schema;

const characterSchema = Schema({
  id:   Number,
  name: String,
  occupation: String,
  weapon: String,
  cartoon: Boolean
});

const Character = mongoose.model("Character", characterSchema);

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/ajax-crud-characters', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

app.get("/characters", (req, res, next) =>{
  Character.find((err, character) => {
    res.json(character) // Generates the cities as a JSON file.
  });
});

app.get("/characters/:id", (req, res, next) =>{
  Character.findOne({id: req.params.id}, (err, oneCharacter) => {
    res.json(oneCharacter) // Generates the cities as a JSON file.
  });
});

const index = require('./routes/index');
app.use('/', index);

module.exports = app;
