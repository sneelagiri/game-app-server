const express = require("express");
const cors = require("cors");
const lobbyFactory = require("./lobby/router");
const app = express();
const Sse = require("json-sse");
const Lobby = require("./lobby/model");
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const stream = new Sse();

// get on the stream
app.get("/stream", async (request, response, next) => {
  try {
    const lobbies = await Lobby.findAll({ include: [User] });

    const action = {
      type: "ALL_LOBBIES",
      payload: lobbies
    };

    const json = JSON.stringify(action);

    stream.updateInit(json);
    stream.init(request, response);
  } catch (error) {
    next(error);
  }
});

const userRouter = lobbyFactory(stream);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
