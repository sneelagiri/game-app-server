const Sequelize = require("sequelize");
const sequelize = require("../db");

const Question = sequelize.define("question", {
  questionSentence: {
    type: Sequelize.text
  },
  answerOne: {
    type: Sequelize.text
  },
  answerTwo: {
    type: Sequelize.text
  },
  answerThree: {
    type: Sequelize.text
  },
  answerFour: {
    type: Sequelize.text
  }
});

module.exports = Question;
