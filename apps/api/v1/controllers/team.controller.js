const teamService = require("@services/team.service");
const catchAsync = require("@utils/catchAsync");

exports.create = catchAsync(async (req, res) => {
  const teamData = await teamService.createTeam(req.user.id, req.body.name, req.body.members);
  res.status(201).json({
    message: "Tạo team thành công",
    team: teamData,
  });
});

exports.getUserTeams = catchAsync(async (req, res) => {
  const data = await teamService.getUserTeamsTree(req.user.id);
  res.json(data);
});

exports.getTeam = catchAsync(async (req, res) => {
  const teamList = await teamService.getTeamList(req.user.id);
  res.json(teamList);
});
