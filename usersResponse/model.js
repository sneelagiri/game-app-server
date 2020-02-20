const Sequelize = require("sequelize");
const sequelize = require("../db");

const UsersResponse = sequelize.define("usersResponse", {
  questionOne: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionTwo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionThree: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionFour: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionFive: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionSix: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionSeven: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionEight: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionNine: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questionTen: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = UsersResponse;
