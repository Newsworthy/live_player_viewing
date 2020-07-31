const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Item = require("../../models/Item.js");

// @route GET api/items
// @desc GET all Items
// @access  Public

router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create a POST
// @access  Private
// name: {type: String,required: true,},
// client: {type: String,required: true,},
// agency: {type: String,},
// playbackURL: {type: String,required: true,},
// dateCreated: {type: Date,default: Date.now,},
// dateTransmitting: {type: Date,default: Date.now,},
router.post("/", auth, (req, res) => {
  console.log(req.body);
  const newItem = new Item({
    name: req.body.name,
    client: req.body.client,
    agency: req.body.agency,
    playbackURL: req.body.playbackURL,
    dateTX: req.body.dateTX,
  });
  newItem.save().then((item) => res.json(item));
});

// @route DELETE /api/items/:id
// @desc Delete an item
// @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error("No item found");

    const removed = await item.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the item");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;
