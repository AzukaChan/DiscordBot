const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  userId: String,
  ffixID: String,
  guildId: String,
});

module.exports = mongoose.model("User", UserSchema);
