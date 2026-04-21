import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard, Roles, RolesGuard, RoleEnum } from '@app/common';
import { GetUser } from '@app/common/decorator/get-user.decorator'; // Import tờ Note bạn vừa tạo
@Controller('team')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  @Roles(RoleEnum.ADMIN)
  @Post('team')
  create(@Request() req, @Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(req.user.id, createTeamDto);
  }

  @Get('getteams')
  findAll(@Request() req:any) {
    return this.teamsService.findUserTeams(req.user.id);
  }

  @Get('user-teams')
    findUserTeams(@GetUser() user) {
      return this.teamsService.findUserTeams(user.id);
  }
}
