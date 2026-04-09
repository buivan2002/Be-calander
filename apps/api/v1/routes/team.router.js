const express = require('express');
const router = express.Router();
const authMiddleware = require("@middlewares/auth");
const teamController = require('@controllers/team.controller');

router.post("/", authMiddleware, teamController.create);
router.get("/user-teams", authMiddleware, teamController.getUserTeams);
router.get("/getteams", authMiddleware, teamController.getTeam);

module.exports = router;
