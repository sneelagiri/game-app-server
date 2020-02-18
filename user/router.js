const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT } = require("../auth/jwt");
const router = new Router();

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
        return response.status(400).send({ message: error.errors[0].message });
      default:
        return response.status(400).send("Baaaddd request");
    }
  }
});

module.exports = router;
