const Sequelize = require("sequelize");
const sequelize = require("../db");
const User = require("../user/model");

const UsersResponse = sequelize.define("usersResponse", {
  questionOne: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionTwo: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionThree: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionFour: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionFive: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionSix: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionSeven: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionEight: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionNine: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  questionTen: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  points: {
    type: Sequelize.INTEGER
  }
});

User.belongsTo(UsersResponse);

module.exports = UsersResponse;
