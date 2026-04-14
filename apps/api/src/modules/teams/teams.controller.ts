import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post('team')
  create(@Request() req, @Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(req.user.id, createTeamDto);
  }

  @Get('getteams')
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('user-teams')
  findUserTeams(@Request() req) {
    return this.teamsService.findUserTeams(req.user.id);
  }
}
