const { Team, User, UserTeamRole, Role } = require("@models");
const redis = require("@common/redis");
const ApiError = require("@utils/ApiError");

class TeamService {
  async createTeam(userId, name, members) {
    if (!name) {
      throw new ApiError(400, "Tên team là bắt buộc");
    }
    if (!Array.isArray(members) || members.length === 0) {
      throw new ApiError(400, "Danh sách thành viên không hợp lệ");
    }

    const team = await Team.create({ name });

    await UserTeamRole.create({
      user_id: userId,
      team_id: team.id,
      role_id: 2,
    });
    

    if (Array.isArray(members) && members.length > 0) {
      for (const email of members) {
        const memberUser = await User.findOne({ where: { email } });
        if (memberUser) {
          await UserTeamRole.create({
            user_id: memberUser.id,
            team_id: team.id,
            role_id: 3, 
          });
        }
      }
    }

    return {
      id: team.id,
      name: team.name,
      members: members.length
    };
  }

  async getUserTeamsTree(userId) {
    const userTeams = await UserTeamRole.findAll({
      where: { user_id: userId },
      include: [
        { model: Team },
        { model: Role }
      ],
    });
    return userTeams.map((item) => ({
      id: item.Team.id,
      name: item.Team.name,
      roleName: item.Role.name,
    }));
  }

  async getTeamList(userId) {
    const userTeams = await UserTeamRole.findAll({
      where: { user_id: userId },
      include: [{ model: Team, attributes: ['id', 'name'] }],
      raw: true,
      nest: true,
    });
    return userTeams.map(record => ({
      id: record.Team.id,
      name: record.Team.name
    }));
  }
}

module.exports = new TeamService();
