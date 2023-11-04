// controllers/company.js
const Company = require('../models/Company');
const Review = require('../models/Review');

exports.getAddReview = (req, res) => {
  // Display a form for adding a new review
  res.render('addReview', { pageTitle: 'Add a Review'});
};

exports.postAddReview = async (req, res) => {
  const { name, pros, cons, rating } = req.body;

  const review = await Review.create({ pros, cons, rating });
  const company = await Company.findOne({ where: { name } });

  if (company) {
    await company.addReview(review);
  } else {
    const newCompany = await Company.create({ name });
    await newCompany.addReview(review);
  }

  res.redirect('/');
};

exports.getSearchForm = (req, res) => {
  res.render('search', { pageTitle: 'Search for a Company', results: [] });
};

exports.postSearch = async (req, res) => {
  console.log('postSearch route is reached');
  const { companyName } = req.body;

  if (companyName) {
    const results = await Company.findAll({ where: { name: companyName } });

    res.render('search', {
      pageTitle: 'Search for a Company',
      results: results,
    });
  } else {
    const results = []; // Define an empty array if there are no results
    res.render('search', {
      pageTitle: 'Search for a Company',
      results: results,
      });
  }
};

exports.getCompanyDetails = (req, res) => {
  const companyId = req.params.companyId;

  Company.findByPk(companyId, { include: Review })
    .then((company) => {
      if (!company) {
        return res.status(404).send('Company not found');
      }

      res.render('companyDetails', {
        pageTitle: 'Company Details',
        company,
      });
    })
    .catch((error) => {
      console.error('Error fetching company details:', error);
      res.status(500).send('Error fetching company details');
    });
};

exports.getAddCompany = (req, res) => {
  // Display a form for adding a new company
  res.render('addCompany', { pageTitle: 'Add a Company'});
};

exports.postAddCompany = async (req, res) => {
  const { name } = req.body;

  // Create the new company in the database
  const company = await Company.create({ name });

  res.redirect('/'); // Redirect to the home page after adding the company
};