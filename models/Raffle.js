const mongoose = require("mongoose");

const RaffleSchema = mongoose.Schema({
  guildId: String,
  raffleRole: String,
  raffleName: String,
  usersJoined: [],
  raffleRoleName: String,
  createdById: String,
  createdByName: String,
});

module.exports = mongoose.model("Raffle", RaffleSchema);
