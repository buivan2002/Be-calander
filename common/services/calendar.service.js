const { Calendar, User, Team, UserTeamRole, Role } = require("@models");
const ApiError = require("@utils/ApiError");

class CalendarService {
  async createCalendar(payload, userId) {
    const { name, type, start_time, end_time, status, teamId } = payload;
    
    if (!start_time || !end_time || !teamId) {
      throw new ApiError(400, "Trường 'start_time' và 'end_time' là bắt buộc.");
    }
    if (new Date(start_time) >= new Date(end_time)) {
      throw new ApiError(400, "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.");
    }

    return await Calendar.create({
      name,
      type,
      start_time,
      end_time,
      status,
      team_id: teamId,
      user_id: userId
    });
  }

  async getUserCalendars(userId) {
    const calendars = await Calendar.findAll({
      where: { user_id: userId },
      include: [
        { model: User, attributes: ['email'] },
        { model: Team, attributes: ['name'] }
      ]
    });

    const results = await Promise.all(calendars.map(async (calendar) => {
      const utr = await UserTeamRole.findOne({
        where: { user_id: userId, team_id: calendar.team_id },
        include: [{ model: Role, attributes: ['name'] }]
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

    return results;
  }

  async updateCalendar(id, payload) {
    const calendar = await Calendar.findByPk(id);
    if (!calendar) {
      throw new ApiError(404, "Calendar not found");
    }

    await calendar.update(payload);
    return calendar;
  }

  async deleteCalendar(id) {
    const calendar = await Calendar.findByPk(id);
    if (!calendar) {
      throw new ApiError(404, "Calendar không tồn tại");
    }
    await calendar.destroy();
  }
}

module.exports = new CalendarService();
