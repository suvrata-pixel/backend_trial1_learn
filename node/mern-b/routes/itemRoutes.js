const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getItems,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/itemController");

router.get("/items", authMiddleware, getItems);

router.post("/items", upload.single("image"), createItem);

router.put("/items/:id", updateItem);

router.delete("/items/:id", deleteItem);

module.exports = router;