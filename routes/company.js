// routes/company.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company');

// Route to display the form for adding a new company
router.get('/add-company', companyController.getAddCompany);

// Route to handle the submission of a new company
router.post('/add-company', companyController.postAddCompany);

// Route to display the form for adding a new review
router.get('/add-review', companyController.getAddReview);

// Route to handle the submission of a new review
router.post('/add-review', companyController.postAddReview);

// Route to display the search form
router.get('/search', companyController.getSearchForm);

// Route to process the search and display results
router.post('/search', companyController.postSearch);

// Route to display the details of a company and its reviews
router.get('/details/:companyId', companyController.getCompanyDetails);

module.exports = router;

