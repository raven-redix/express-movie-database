const {sequelize, DataTypes, Model} = require('../db');

class Movie extends Model {};

Movie.init({
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  genre: DataTypes.STRING,
  rating: DataTypes.STRING
}, {
  sequelize, 
  timestamps: false
});

module.exports = {Movie};
