// models/Review.js

const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Review = sequelize.define('Review', {
  pros: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  cons: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Review;
