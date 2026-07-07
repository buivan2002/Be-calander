import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarDto } from './dto/calendar.dto';
import { JwtAuthGuard, RolesGuard, RoleEnum, Roles } from '@app/common';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

interface AuthUser {
  id: number;
  role: string;
}

interface RequestWithUser {
  user: AuthUser;
}

@Controller('calendars')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CalendarsController {
  constructor(private readonly calendarsService: CalendarsService) {}

  @Roles(RoleEnum.ADMIN)
  @Get('admin')
  findAllForAdmin() {
    return this.calendarsService.findAllForAdmin();
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('user')
  findAllForUser(
    @Request() req: RequestWithUser,
    @Query('user_id') userId?: string,
  ) {
    return this.calendarsService.findAllForUser(req.user, userId);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('assignees')
  findPermittedAssignees(@Request() req: RequestWithUser) {
    return this.calendarsService.findPermittedAssignees(req.user);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Get('workload')
  findWeeklyWorkload(
    @Request() req: RequestWithUser,
    @Query('user_id', ParseIntPipe) userId: number,
    @Query('week_start') weekStart: string,
  ) {
    return this.calendarsService.findWeeklyWorkload(
      req.user,
      userId,
      weekStart,
    );
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Post('')
  create(@Request() req: RequestWithUser, @Body() calendarDto: CalendarDto) {
    return this.calendarsService.createWithRules(req.user, calendarDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Patch(':id/status')
  updateStatus(
    @Request() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
    @Body('file_id') file_id?: number,
  ) {
    return this.calendarsService.updateStatus(id, req.user, status, file_id);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Put(':id')
  update(
    @Request() req: RequestWithUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() calendarDto: UpdateCalendarDto,
  ) {
    return this.calendarsService.update(id, req.user, calendarDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.calendarsService.remove(id);
  }
}
