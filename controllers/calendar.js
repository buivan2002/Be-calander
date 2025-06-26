const { Calendar } = require("../models"); // nếu dùng Sequelize
const { User, Team, UserTeamRole, Role } = require("../models"); // Model sequelize
const { Sequelize } = require('sequelize');

exports.createCalendars = async (req, res) => {
    const { name, type, start_time, end_time, status, teamId } = req.body;
    const user_id = req.user.id;

  // ✅ Kiểm tra start_time và end_time bắt buộc
  if (!start_time || !end_time || !teamId) {
    return res.status(400).json({
      error: "Trường 'start_time' và 'end_time' là bắt buộc.",
    });
  }
  if (new Date(start_time) >= new Date(end_time)) {
  return res.status(400).json({
    error: "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.",
  });
}
  try {
    const newCalendar = await Calendar.create({
      name,
      type,
      start_time,
      end_time,
      status,
        team_id: teamId,
      user_id
    });

    res.status(201).json({
      message: "Tạo lịch thành công",
      data: newCalendar,
    });
  } catch (error) {
    console.error("❌ Lỗi tạo lịch:", error);
    res.status(500).json({ error: "Lỗi server" });
  }
}

exports.getCalendars = async (req, res) => {
// nên ta sẽ lấy riêng ở bước sau
const calendars = await Calendar.findAll({
  where: { user_id: req.user.id },
  include: [
    {
      model: User,
      attributes: ['email']
    },
    {
      model: Team,
      attributes: ['name']
    }
  ]
});

// Sau đó map và JOIN tay bằng JS:
const results = await Promise.all(calendars.map(async (calendar) => {
  const utr = await UserTeamRole.findOne({
    where: {
      user_id: req.user.id,
      team_id: calendar.team_id
    },
    include: [{
      model: Role,
      attributes: ['name']
    }]
  });
    const cleaned = { ...calendar.toJSON() };
    delete cleaned.User;
    delete cleaned.Team;
  return {
    ...cleaned,
    user: calendar.User?.email,
    team: calendar.Team?.name,
    role: utr?.Role?.name || null
  };
}));
res.json(results);

}


exports.updatecalendar = async (req, res) => {
const calendarId = req.params.id;
  const {
    name,
    type,
    start_time,
    end_time,
    status,
    user,
    team,
    role,
  } = req.body;

  try {
    const calendar = await Calendar.findByPk(calendarId);
    console.log (calendar)
    if (!calendar) {
      return res.status(404).json({ message: "Calendar not found" });
    }

    await calendar.update({
      name,
      type,
      start_time,
      end_time,
      status,
      user,
      team,
      role,
    });

    res.json({ message: "Cập nhật thành công", calendar });
  } catch (error) {
    console.error("❌ Lỗi update calendar:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}

exports.deletecalendar = async (req, res) => {
 const calendarId = req.params.id;

  try {
    const calendar = await Calendar.findByPk(calendarId);

    if (!calendar) {
      return res.status(404).json({ message: "Calendar không tồn tại" });
    }

    await calendar.destroy();

    res.json({ message: "🗑️ Xóa thành công" });
  } catch (error) {
    console.error("❌ Lỗi khi xóa calendar:", error);
    res.status(500).json({ message: "Lỗi server khi xóa calendar" });
  }

}