const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../user/model");
const bcrypt = require("bcrypt");
const auth = require("./middleware");

const router = new Router();

// define endpoints here
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password"
    });
  } else {
    // 1. find user based on email address
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that email does not exist"
          });
        }
        // 2. use bcrypt.compareSync to check the password against the stored hash
        else if (bcrypt.compareSync(req.body.password, entity.password)) {
          // console.log("entity", entity);
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id }),
            userId: entity.id
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
  }
});

// to test: http :4000/secret-endpoint "Authorization":"Bearer <jwt-token>"
router.get("/secret-endpoint", auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`
  });
});
module.exports = router;
