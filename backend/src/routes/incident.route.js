const express = require("express");
const {
  getAll,
  create,
  remove,
  update,
  get,
} = require("../controllers/incident.controller");

const router = express.Router();

router.get("/incident", async (req, res) => {
  const data = await getAll();
  res.json(data);
});

router.get("/incident/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return;
  const data = await get(id);
  res.json(data);
});

router.post("/incident", async (req, res) => {
  const body = req.body;
  if (!body.description || !body.title || !body.type) return;
  await create(body);
  res.json();
});

router.put("/incident/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (!body.assignedTo || !id) return;
  await update(id, body);
  res.json();
});

router.delete("/incident/:id", async (req, res) => {
  const id = req.params.id;
  await remove(id);
  res.json();
});

module.exports = router;
