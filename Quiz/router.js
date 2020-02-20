const { Router } = require("express");
const router = new Router();
const Questions = require("./questionModel");
const Answers = require("./answerModel");
// const User = require("../user/model");

router.get("/questions", (req, res, next) =>
  Questions.findAll({ include: [Answers] })
    .then(result => res.json(result))
    .catch(err => next(err))
);

router.post("/questions", (req, res, next) => {
  Questions.create({
    name: "What colour is the circle on the Japanese flag?"
  }),
    Questions.create({
      name: "What is the Capital of the United States?"
    }),
    Questions.create({
      name: "Which celebrity announced his presidency in 2015"
    }),
    Questions.create({
      name:
        "Which of these is NOT the name of an album released by English singer-songwriter Adele?"
    }),
    Questions.create({
      name: "Harvard University is located in which city?"
    }),
    Questions.create({
      name: "How many sides does a heptagon have?"
    }),
    Questions.create({
      name: "Who plays the character of Po in the Kung Fu Panda movies?"
    }),
    Questions.create({
      name: "When one is 'envious';, they are said to be what color?"
    }),
    Questions.create({
      name:
        "Daniel Radcliffe became a global star in the film industry due to his performance in which film franchise?"
    }),
    Questions.create({
      name: "How many bones are in the human body?"
    })
      .then(req => res.json(req))
      .catch(err => next(err));
});

router.post("/answers", (req, res, next) => {
  Answers.create({
    name: "White",
    correct: "false",
    questionId: 1
  }),
    Answers.create({
      name: "Yellow",
      correct: "false",
      questionId: 1
    }),
    Answers.create({
      name: "Red",
      correct: "true",
      questionId: 1
    }),
    Answers.create({
      name: "Black",
      correct: "false",
      questionId: 1
    }),
    Answers.create({
      name: "New York City, NY",
      correct: "false",
      questionId: 2
    }),
    Answers.create({
      name: "Los Angelas, CA",
      correct: "false",
      questionId: 2
    }),
    Answers.create({
      name: "Houston, TX",
      correct: "false",
      questionId: 2
    }),
    Answers.create({
      name: "Washington, D.C.",
      correct: "true",
      questionId: 2
    }),
    Answers.create({
      name: "Donald Trump",
      correct: "false",
      questionId: 3
    }),
    Answers.create({
      name: "Leonardo DiCaprio",
      correct: "false",
      questionId: 3
    }),
    Answers.create({
      name: "Miley Cyrus",
      correct: "false",
      questionId: 3
    }),
    Answers.create({
      name: "Kanye West",
      correct: "true",
      questionId: 3
    }),
    Answers.create({
      name: "19",
      correct: "false",
      questionId: 4
    }),
    Answers.create({
      name: "12",
      correct: "true",
      questionId: 4
    }),
    Answers.create({
      name: "21",
      correct: "false",
      questionId: 4
    }),
    Answers.create({
      name: "25",
      correct: "false",
      questionId: 4
    }),
    Answers.create({
      name: "Cambridge",
      correct: "true",
      questionId: 5
    }),
    Answers.create({
      name: "Harvard",
      correct: "false",
      questionId: 5
    }),
    Answers.create({
      name: "Oxford",
      correct: "false",
      questionId: 5
    }),
    Answers.create({
      name: "Boston",
      correct: "false",
      questionId: 5
    }),
    Answers.create({
      name: "6",
      correct: "false",
      questionId: 6
    }),
    Answers.create({
      name: "8",
      correct: "false",
      questionId: 6
    }),
    Answers.create({
      name: "7",
      correct: "true",
      questionId: 6
    }),
    Answers.create({
      name: "5",
      correct: "false",
      questionId: 6
    }),
    Answers.create({
      name: "Jim Carry",
      correct: "false",
      questionId: 7
    }),
    Answers.create({
      name: "Jack Black",
      correct: "true",
      questionId: 7
    }),
    Answers.create({
      name: "Jackie Chan",
      correct: "false",
      questionId: 7
    }),
    Answers.create({
      name: "Steve Carell",
      correct: "false",
      questionId: 7
    }),
    Answers.create({
      name: "Red",
      correct: "false",
      questionId: 8
    }),
    Answers.create({
      name: "Yellow",
      correct: "false",
      questionId: 8
    }),
    Answers.create({
      name: "Green",
      correct: "true",
      questionId: 8
    }),
    Answers.create({
      name: "Purple",
      correct: "false",
      questionId: 8
    }),
    Answers.create({
      name: "Mrs Potter",
      correct: "false",
      questionId: 9
    }),
    Answers.create({
      name: "Dobby",
      correct: "false",
      questionId: 9
    }),
    Answers.create({
      name: "Dudley Dursley",
      correct: "false",
      questionId: 9
    }),
    Answers.create({
      name: "Harry Potter",
      correct: "true",
      questionId: 9
    }),
    Answers.create({
      name: "207",
      correct: "false",
      questionId: 10
    }),
    Answers.create({
      name: "206",
      correct: "true",
      questionId: 10
    }),
    Answers.create({
      name: "205",
      correct: "false",
      questionId: 10
    }),
    Answers.create({
      name: "209",
      correct: "false",
      questionId: 10
    })
      .then(req => res.json(req))
      .catch(err => next(err));
});

module.exports = router;
