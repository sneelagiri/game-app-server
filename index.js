const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const userFactory = require("./user/router");
const app = express();
const Sse = require("json-sse");
const User = require("./user/model");
const Lobby = require("./lobby/model");
const lobbyFactory = require("./lobby/router");
const authRouter = require("./auth/router");
const { TriviaGameManager } = require("");

const port = process.env.PORT || 4000;
const server = http.createServer(app);
const io = socketio(server);
const games = new TriviaGameManager();
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

const lobbyRouter = lobbyFactory(stream);
app.use(lobbyRouter);
const userRouter = userFactory(stream);
app.use(userRouter);

app.use(authRouter);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
