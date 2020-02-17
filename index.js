const express = require("express");
const cors = require("cors");
const User = require("./user/model");
const userFactory = require("./user/router");
const app = express();

const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const userRouter = app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
