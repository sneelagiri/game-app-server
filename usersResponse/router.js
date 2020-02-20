const { Router } = require("express");
const usersResponse = require("./model");
const router = new Router();
const User = require("../user/model");
const axios = require("axios");
function factory(stream) {
  router.post("/userResponse", async function(request, response, next) {
    try {
      const { body } = request;
      const booleanArray = Object.values(body);
      let points = 0;
      booleanArray.map(boolean => {
        if (boolean === "true") {
          points = points + 10;
          return boolean;
        } else {
          return boolean;
        }
      });
      body.points = points;
      const ref = await usersResponse.create(body);
      // response.send(ref);
      if (ref) {
        const matchingUser = await User.findByPk(body.userId, {
          include: usersResponse
        });
        // console.log(matchingUser);
        if (matchingUser) {
          const updatedUser = await matchingUser.update({
            usersResponseId: ref.id
          });
          const action = {
            type: "USER_POINTS",
            payload: updatedUser
          };
          const json = JSON.stringify(action);

          stream.send(json);
          response.send(json);
        }
      } else {
        return "Not finished";
      }
    } catch (error) {
      console.error(error);
    }
  });
  router.post("/questions", async function(request, response, next) {
    console.log("AM I BEING REACHED?");
    try {
      const fetchedQuestions = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      // console.log(fetchedQuestions);
      const questions = [...fetchedQuestions.data.results];
      const updatedQuestions = questions.map(object => {
        object.incorrect_answers.push(object.correct_answer);
        object["options"] = object["incorrect_answers"];
        delete object.incorrect_answers;
        return object;
      });
      // console.log("These are the updated questions", updatedQuestions);
      const action = {
        type: "FETCH_QUESTIONS",
        payload: updatedQuestions
      };
      const json = JSON.stringify(action);

      stream.send(json);
      response.send(updatedQuestions);
    } catch (error) {
      throw new Error("Unable to fetch questions", error);
    }
  });
  return router;
}

module.exports = factory;