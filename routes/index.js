const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const todosController = require('../controllers/todos')
const loginController = require('../controllers/login')
const teamController = require('../controllers/team')
const calendarController = require('../controllers/calendar')

router.get("/todos", todosController.getTodos);
router.post("/todos", todosController.createTodo);
router.put("/todos/:id", todosController.updateTodo);
router.delete("/todos/:id", todosController.deleteTodo);
router.put("/checktodos/:id", todosController.checkComplete);
router.post("/login", loginController.login);
router.post("/register", loginController.register);
router.post("/logout", loginController.logout);
router.post("/team",authMiddleware, teamController.create);
router.get("/user-teams", authMiddleware, teamController.getUserTeams);
router.get("/getteams", authMiddleware, teamController.getTeam);
router.post("/calendars", authMiddleware, calendarController.createCalendars);
router.get("/getcalendars", authMiddleware, calendarController.getCalendars);
router.put("/updatecalendar/:id", authMiddleware, calendarController.updatecalendar);
router.delete("/deletecalendar/:id", authMiddleware, calendarController.deletecalendar);

module.exports = router;
