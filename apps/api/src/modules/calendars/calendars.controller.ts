import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarDto } from './dto/calendar.dto';
import { JwtAuthGuard, RolesGuard, RoleEnum, Roles } from '@app/common';

@Controller('calendars')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CalendarsController {
  constructor(private readonly calendarsService: CalendarsService) {}

  @Roles(RoleEnum.ADMIN)
  @Get('admin')
  findAllForAdmin() {
    return this.calendarsService.findAllForAdmin();
  }

  @Roles(RoleEnum.USER)
  @Get('user')
  findAllForUser(@Request() req) {
    return this.calendarsService.findAllForUser(req.user.id);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Post('')
  create(@Request() req, @Body() calendarDto: CalendarDto) {
    return this.calendarsService.createWithRules(req.user, calendarDto);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.USER)
  @Patch(':id/status')
  updateStatus(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
    @Body('file_id') file_id?: number
  ) {
    return this.calendarsService.updateStatus(id, req.user, status, file_id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() calendarDto: CalendarDto) {
    return this.calendarsService.update(id, calendarDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.calendarsService.remove(id);
  }
}
