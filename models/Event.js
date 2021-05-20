const mongoose = require("mongoose");

const RaffleSchema = mongoose.Schema({});

module.exports = mongoose.model("Raffle", RaffleSchema);
