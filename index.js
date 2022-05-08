const express = require('express');
const app = express();
require('dotenv').config() 

const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded({
  extended: true
}))

const path = require('path');
const public = path.join(__dirname, 'public');
//app.use(express.static(public));
app.use(express.static(__dirname + '/public'));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/foodRoute');
app.use('/', router);

const foodController = require('./controllers/foodController');
app.get('*', foodController.Error);

app.listen(3000, () => {
  console.log('Server started on port 3000. Ctrl^c to quit.');
})  