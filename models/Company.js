// models/Company.js

const Review = require('./Review'); // Import the Review model
const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Company;

// Establish an association
Company.hasMany(Review, { onDelete: 'CASCADE' });
Review.belongsTo(Company);

module.exports = Company;
