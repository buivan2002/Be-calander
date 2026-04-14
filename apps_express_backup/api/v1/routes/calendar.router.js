const express = require('express');
const router = express.Router();
const authMiddleware = require("@middlewares/auth");
const calendarController = require('@controllers/calendar.controller');

router.post("/", authMiddleware, calendarController.createCalendars);
router.get("/", authMiddleware, calendarController.getCalendars);
router.put("/:id", authMiddleware, calendarController.updatecalendar);
router.delete("/:id", authMiddleware, calendarController.deletecalendar);

module.exports = router;
