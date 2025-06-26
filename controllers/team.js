const { User, Team, UserTeamRole, Role } = require("../models"); // Model sequelize
const redis = require('../redis'); // đường dẫn tùy vào project của bạn

exports.create = async (req, res) => {
  const { name, members } = req.body;
  const userId = req.user.id; // current_user

  if (!name) {
    return res.status(400).json({ message: "Tên team là bắt buộc" });
  }

  if (!Array.isArray(members) || members.length === 0) {
    return res.status(400).json({ message: "Danh sách thành viên không hợp lệ" });
  }
  try {
    const team = await Team.create({ name });

    // Gán vai trò cho người tạo (role_id = 2)

    await UserTeamRole.create({
      user_id: userId,
      team_id: team.id,
      role_id: 2,
    });
    await redis.del(`user_teams:${userId}`);

    // Những người được thêm vào (role_id = 3)
    if (Array.isArray(members) && members.length > 0) {
      for (const email of members) {
        const memberUser = await User.findOne({ where: { email } });
        if (memberUser) {
          await UserTeamRole.create({
            user_id: memberUser.id,
            team_id: team.id,
            role_id: 3, // member
          });
        }
      }
    }

    res.status(201).json({
      message: "Tạo team thành công",
      team: {
        id: team.id,
        name: team.name,
        members: members.length
      },
    });
  } catch (err) {
    console.error("Lỗi tạo team:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}


exports.getUserTeams = async (req, res) => {
  try {
    const user_id = req.user.id;
    const cacheKey = `user_teams:${user_id}`;
    // const cached = await redis.get(cacheKey);
    // if (cached) {
    //   console.log('⚡ Cache hit');
    //   return res.json(JSON.parse(cached));
    // }
    const userTeams = await UserTeamRole.findAll({
      where: { user_id },
      include: [
        {
          model: Team,
        },
        {
          model: Role,
        },
      ],
    });
    const data = userTeams.map((item) => ({
      id: item.Team.dataValues.id,
      name: item.Team.dataValues.name,
      roleName: item.Role.dataValues.name,
    }));

    // await redis.set(cacheKey, JSON.stringify(data), 'EX', 36000);
    console.log('✅ DB queried and cached');
    res.json(data);
  } catch (err) {
    console.error("Lỗi lấy user teams:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const user_id = req.user.id;
    const userTeams = await UserTeamRole.findAll({
      where: { user_id },
      include: [
        {
          model: Team,
          attributes: ['id', 'name']
        }
      ],
      raw: true,
      nest: true,
    });
    const teamList = userTeams.map(record => ({
      id: record.Team.id,
      name: record.Team.name
    }));

    res.json(teamList);
  } catch (err) {
    console.error("Lỗi lấy teams:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
}

