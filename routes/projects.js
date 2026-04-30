const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const project = new Project({ ...req.body, createdBy: req.user.id });
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;