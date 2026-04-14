const calendarService = require("@services/calendar.service");
const catchAsync = require("@utils/catchAsync");

exports.createCalendars = catchAsync(async (req, res) => {
  const newCalendar = await calendarService.createCalendar(req.body, req.user.id);
  res.status(201).json({
    message: "Tạo lịch thành công",
    data: newCalendar,
  });
});

exports.getCalendars = catchAsync(async (req, res) => {
  const results = await calendarService.getUserCalendars(req.user.id);
  res.json(results);
});

exports.updatecalendar = catchAsync(async (req, res) => {
  const calendar = await calendarService.updateCalendar(req.params.id, req.body);
  res.json({ message: "Cập nhật thành công", calendar });
});

exports.deletecalendar = catchAsync(async (req, res) => {
  await calendarService.deleteCalendar(req.params.id);
  res.json({ message: "🗑️ Xóa thành công" });
});