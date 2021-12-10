const { sequelize, DataTypes, Model } = require('./db');
const { Movie } = require('./Models/Movie');
const { CastMember } = require('./Models/CastMember');
const { CrewMember } = require('./Models/CrewMember');

CastMember.belongsTo(Movie);
Movie.hasMany(CastMember);

CrewMember.belongsTo(Movie);
Movie.hasMany(CrewMember);

module.exports = { Movie, CastMember, CrewMember };