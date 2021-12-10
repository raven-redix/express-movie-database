const {sequelize, DataTypes, Model} = require('../db');

class CastMember extends Model {};

CastMember.init({
  name: DataTypes.STRING,
  part: DataTypes.STRING,
  salary: DataTypes.INTEGER
}, {
  sequelize, 
  timestamps: false
});


module.exports = {CastMember};
