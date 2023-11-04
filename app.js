// app.js
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
//const companyRoutes = require('./routes/company');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Include your company routes
const companyRoutes = require('./routes/company');
app.use('/company/', companyRoutes);

// Change the route for the search functionality
app.use('/company/search', companyRoutes);

app.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home' }); // Create a separate 'home' view for the home page
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });
