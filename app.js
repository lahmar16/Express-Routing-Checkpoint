


const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));

// using middleware to check if it's working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    // if it's not working hours, proceed with the next middleware/route
    next();
  } else {
    // outside the working hours, send a message
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// the  middleware for all routes
app.use(checkWorkingHours);

// setting the view engine to EJS
app.set('view engine', 'ejs');

// general routes for each page
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// run the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
