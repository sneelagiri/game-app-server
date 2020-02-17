const db = require("../db");
const Sequelize = require("sequelize");
const User = require("../user/model");

const Lobby = db.define("lobby", {
  name: Sequelize.STRING
});

User.belongsTo(Lobby);
Lobby.hasMany(User);

module.exports = Lobby;
