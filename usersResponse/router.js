const { Router } = require("express");
const usersResponse = require("./model");
const router = new Router();
const User = require("../user/model");
const axios = require("axios");
function factory(stream) {
  router.post("/userResponse", async function(request, response, next) {
    try {
      const { body } = request;
      console.log(body);
      const ref = await usersResponse.create(body);
      response.send(ref);
      // const booleanArray = Object.values(body);
      // let points = 0;
      // booleanArray.map(boolean => {
      //   if (boolean === "true") {
      //     points = points + 10;
      //     return boolean;
      //   } else {
      //     return boolean;
      //   }
      // });
      // const ref = await usersResponse.create(body);
      // // response.send(ref);
      // if (ref) {
      //   const matchingUser = await User.findByPk(body.userId, {
      //     include: usersResponse
      //   });
      //   // console.log(matchingUser);
      //   if (matchingUser) {
      //     const updatedUser = await matchingUser.update({
      //       usersResponseId: ref.id
      //     });
      //     const action = {
      //       type: "USER_POINTS",
      //       payload: updatedUser
      //     };
      //     const json = JSON.stringify(action);

      //     stream.send(json);
      //     response.send(json);
      // }
      // } else {
      //   return "Not finished";
      // }
    } catch (error) {
      console.error(error);
    }
  });

  return router;
}

module.exports = factory;
