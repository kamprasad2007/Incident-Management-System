const express = require("express");
const { getAll } = require("../controllers/user.controller");

const router = express.Router();

router.get("/user", async (req, res) => {
  const users = await getAll();
  res.json(users);
});

module.exports = router;
