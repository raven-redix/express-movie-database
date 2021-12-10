const {sequelize, DataTypes, Model} = require('../db');

class CrewMember extends Model {};

 CrewMember.init({
  name: DataTypes.STRING,
  role: DataTypes.STRING,
  salary: DataTypes.INTEGER,
  department: DataTypes.STRING
}, {
  sequelize, 
  timestamps: false
});

module.exports = { CrewMember };