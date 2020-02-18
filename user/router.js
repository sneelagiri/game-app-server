const { Router } = require("express");
const User = require("./model");
const Lobby = require("../lobby/model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const auth = require("../auth/middleware");
const router = new Router();

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
      console.log("what does the error look like: ", error.errors[0].message);
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

  router.put("/user/:id", auth, async (request, response) => {
    try {
      const match = await User.findByPk(request.params.id);

      if (match) {
        match.update(request.body);
        response.status(201).send(match);
        const lobbies = await Lobby.findAll({ include: [User] });

        console.log("Lobbies in backend: ", lobbies);
        const action = {
          type: "ALL_LOBBIES",
          payload: lobbies
        };

        const json = JSON.stringify(action);

        stream.send(json);
      } else {
        response.status(404).end();
      }
    } catch (error) {
      console.error(error);
    }

    // console.log("Stream in router", stream);
  });
  return router;
}

module.exports = factory;
