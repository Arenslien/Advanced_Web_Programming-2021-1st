// Import sequelize
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

// Import model
const User = require('./user');
const Project = require('./project');
const Skill = require('./skill');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Project = Project;
db.Skill = Skill;

User.init(sequelize);
Project.init(sequelize);
Skill.init(sequelize);

User.associate(db);
Project.associate(db);
Skill.associate(db);


module.exports = db;
