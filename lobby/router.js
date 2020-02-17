const express = require("express");
const Lobby = require("./model");
const User = require("../user/model");

function factory(stream) {
  const { Router } = express;

  const router = Router();

  router.post("/lobby", async function(request, response, next) {
    try {
      const { body } = request;
      console.log("body test:", body);
      const { name } = body;
      const entity = { name };
      const ref = await Lobby.create(entity);

      const lobby = await Lobby.findByPk(ref.id, {
        include: [User]
      });

      const action = {
        type: "ONE_LOBBY",
        payload: lobby
      };

      const json = JSON.stringify(action);

      stream.send(json);

      response.send(lobby);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
