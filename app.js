const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const port = 3000;

// Use helmet
// Docs: https://github.com/helmetjs/helmet
app.use(helmet());

// Pug template engine
// Docs: https://github.com/pugjs/pug
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

// Handle 404
app.use((req, res, next) =>
  res.status(404).render('404', {
    'title' : '404 Not Found',
    'error' : {
      'title' : '404',
      'message' : 'Page not found'
    }
  }));

app.listen(port, () => 
  console.log(`App listening on port ${port}!`));