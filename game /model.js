const Sequelize = require("sequelize");
const sequelize = require("../db");

const Question = sequelize.define("question", {
  questionSentence: {
    type: Sequelize.STRING
  },
  answerOne: {
    type: Sequelize.STRING
  },
  answerTwo: {
    type: Sequelize.STRING
  },
  answerThree: {
    type: Sequelize.STRING
  },
  answerFour: {
    type: Sequelize.STRING
  }
});

module.exports = Question;
