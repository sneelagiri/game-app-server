const express = require("express");
const cors = require("cors");
const userFactory = require("./user/router");
const app = express();
const Sse = require("json-sse");
const User = require("./user/model");
const Lobby = require("./lobby/model");
const UsersResponse = require("./usersResponse/model");
const UsersResponseFactory = require("./usersResponse/router");
const lobbyFactory = require("./lobby/router");
const authRouter = require("./auth/router");
const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);
app.use(authRouter);

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

    console.log(lobbies);
  } catch (error) {
    next(error);
  }
});

const lobbyRouter = lobbyFactory(stream);
app.use(lobbyRouter);
const userRouter = userFactory(stream);
app.use(userRouter);
const UsersResponseRouter = UsersResponseFactory(stream);
app.use(UsersResponseRouter);
app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
