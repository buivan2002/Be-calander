import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { CalendarsService } from './calendars.service';
import { CalendarDto } from './dto/calendar.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class CalendarsController {
  constructor(private readonly calendarsService: CalendarsService) {}

  @Get('getcalendars')
  findAll() {
    return this.calendarsService.findAll();
  }

  @Post('calendars')
  create(@Request() req, @Body() calendarDto: CalendarDto) {
    return this.calendarsService.create(req.user.id, calendarDto);
  }

  @Put('updatecalendar/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() calendarDto: CalendarDto) {
    return this.calendarsService.update(id, calendarDto);
  }

  @Delete('deletecalendar/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.calendarsService.remove(id);
  }
}
