import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { JwtAuthGuard, Roles, RolesGuard, RoleEnum } from '@app/common';
import { GetUser } from '@app/common/decorator/get-user.decorator'; // Import tờ Note bạn vừa tạo
import { AddTeamMemberDto } from './dto/add-team-member.dto';
import { TeamMemberParamDto } from './dto/team-member-param.dto';

interface AuthUser {
  id: number;
}

interface RequestWithUser {
  user: AuthUser;
}

@Controller('team')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Roles(RoleEnum.ADMIN)
  @Post('create')
  create(
    @Request() req: RequestWithUser,
    @Body() createTeamDto: CreateTeamDto,
  ) {
    return this.teamsService.create(req.user.id, createTeamDto);
  }

  @Get('getteams')
  findAll(@Request() req: RequestWithUser) {
    return this.teamsService.findUserTeams(req.user.id);
  }

  @Get('user-teams')
  findUserTeams(@GetUser() user: AuthUser) {
    return this.teamsService.findUserTeams(user.id);
  }

  @Post(':teamId/members')
  addMember(
    @GetUser() user: AuthUser,
    @Param('teamId') teamId: string,
    @Body() addTeamMemberDto: AddTeamMemberDto,
  ) {
    return this.teamsService.addMember(
      user.id,
      Number(teamId),
      addTeamMemberDto.email,
    );
  }

  @Delete(':teamId/members/:userId')
  removeMember(@GetUser() user: AuthUser, @Param() params: TeamMemberParamDto) {
    return this.teamsService.removeMember(
      user.id,
      params.teamId,
      params.userId,
    );
  }

  @Patch(':teamId/members/:userId/demote')
  demoteMember(@GetUser() user: AuthUser, @Param() params: TeamMemberParamDto) {
    return this.teamsService.demoteMember(
      user.id,
      params.teamId,
      params.userId,
    );
  }
}
