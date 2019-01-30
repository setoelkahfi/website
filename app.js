const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Pug template engine
const viewsDir = path.join(__dirname, 'app', 'views');
app.set('view engine', 'pug');
app.set('views', viewsDir);

// Static files
const publicDir = path.join(__dirname, 'build');
app.use(express.static('public'));
app.use('/static', express.static(publicDir));

// Home page routing.
app.get('/', (req, res) => 
	res.render('index', { 
		title: 'Basementline'
	}));

app.use(require('connect-livereload')({
  port: 35729
}));

app.listen(port, () => 
	console.log(`App listening on port ${port}!`));