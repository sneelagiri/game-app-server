const express = require("express");
const cors = require("cors");
const userFactory = require("./user/router");
const app = express();

const port = process.env.PORT || 4000;

const corsMiddleware = cors();
app.use(corsMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use(userFactory);

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
