const { Router } = require("express");
const User = require("./model");
const Lobby = require("../lobby/model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const router = new Router();
const UsersResponse = require("../usersResponse/model");
const axios = require("axios");

function factory(stream) {
  router.post("/user", async (request, response) => {
    if (!request.body.email || !request.body.password) {
      return response
        .status(400)
        .send("Missing email or password in request body");
    }
    const hashedPassword = bcrypt.hashSync(request.body.password, 10);
    try {
      await User.create({
        ...request.body,
        password: hashedPassword
      });
      response.status(201).send("User created");
    } catch (error) {
      // console.log("what does the error look like: ", error.errors[0].message);
      switch (error.name) {
        case "SequelizeUniqueConstraintError":
          return response
            .status(400)
            .send({ message: error.errors[0].message });
        default:
          return response.status(400).send("Baaaddd request");
      }
    }
  });

  //request from the fontend
  //respone from backend to fontend
  router.put("/user/:id", async (request, response) => {
    try {
      //
      const match = await User.findByPk(request.params.id);

      if (match) {
        //req.body = lobbyId

        const finished = await match.update(request.body);
        response.status(201).send(finished);

        //getting data of lobbies including users
        if (finished) {
          const data = await Lobby.findAll({ include: [User] });
          const lobbies = data.map(data => {
            return data.dataValues;
          });
          // console.log("HOW DO I NAVIGATE THROUGH LOBBIES?", lobbies);
          //check each user in each lobby to see if the user is ready to start the game
          const readyStatus = lobbies.map(lobby => {
            return lobby.users.map(user => {
              if (user.ready) {
                return true;
              } else return false;
            });
          });

          //atm, having all lobbies with same questions todo: each lobby should have different questions
          const booleanArray = readyStatus.flat();
          const getQuestions = booleanArray.every(v => v === true);
          // console.log("AM I EVER GETTING TRUE?", getQuestions);
          if (getQuestions) {
            const fetchedQuestions = await axios.get(
              "https://opentdb.com/api.php?amount=10&type=multiple"
            );
            // console.log("WE GET THIS FAR 1");
            const questions = [...fetchedQuestions.data.results];
            const updatedQuestions = questions.map(object => {
              object.incorrect_answers.push(object.correct_answer);
              object["options"] = object["incorrect_answers"];
              delete object.incorrect_answers;
              return object;
            });
            // console.log("THESE ARE THE FETCHED QUESTIONS", fetchedQuestions);
            const questionsAndLobbies = {
              questions: updatedQuestions,
              lobbies: lobbies
            };
            const action = {
              type: "FETCH_QUESTIONS",
              payload: questionsAndLobbies
            };
            const json = JSON.stringify(action);

            stream.send(action);
          } else {
            const action = {
              type: "ALL_LOBBIES",
              payload: lobbies
            };

            const json = JSON.stringify(action);
            //stream send updated data back to the fontend
            stream.send(json);
          }
        } else {
          // console.log("update operation is not finishing");
        }
      } else {
        response.status(404).end();
      }
    } catch (error) {
      console.error(error);
    }

    // console.log("Stream in router", stream);
  });
  router.get("/points", async (request, response) => {
    const data = await User.findAll({
      include: [UsersResponse],
      order: [[UsersResponse, "points", "DESC"]]
    });
    const action = {
      type: "POINTS",
      payload: data
    };
    const json = JSON.stringify(action);
    stream.send(json);
    response.send("points data send through stream");
    console.log("am i getting this end point");
  });

  return router;
}

module.exports = factory;
