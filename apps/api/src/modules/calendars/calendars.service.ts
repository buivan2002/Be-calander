import { Injectable, NotFoundException } from '@nestjs/common';
import { Calendar } from '@app/common';
import { CalendarDto } from './dto/calendar.dto';

@Injectable()
export class CalendarsService {
  async create(userId: number, calendarDto: CalendarDto) {
    const calendar = await Calendar.create({
      ...calendarDto,
      user_id: userId,
    } as any);
    return { message: 'Tạo lịch thành công', calendar };
  }

  async findAll() {
    return Calendar.findAll();
  }

  async update(id: number, calendarDto: CalendarDto) {
    const calendar = await Calendar.findByPk(id);
    if (!calendar) throw new NotFoundException('Lịch không tồn tại');

    await calendar.update(calendarDto);
    return { message: 'Cập nhật thành công', calendar };
  }

  async remove(id: number) {
    const calendar = await Calendar.findByPk(id);
    if (!calendar) throw new NotFoundException('Lịch không tồn tại');

    await calendar.destroy();
    return { message: 'Xóa thành công' };
  }
}
