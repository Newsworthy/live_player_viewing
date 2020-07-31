const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const ItemSchema = new Schema({
  // We're going to create an item for each client livestream
  name: {
    type: String,
    required: true,
  },
  client: {
    type: String,
  },
  agency: {
    type: String,
  },
  playbackURL: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateTransmitting: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
