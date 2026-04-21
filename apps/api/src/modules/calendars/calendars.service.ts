import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Calendar, UserTeamRole, FileModel } from '@app/common';
import { CalendarDto } from './dto/calendar.dto';
import { Op } from 'sequelize';

@Injectable()
export class CalendarsService {
  async findAllForAdmin() {
    return Calendar.findAll({ include: [{ model: FileModel }] });
  }

  async findAllForUser(userId: number) {
    const userTeams = await UserTeamRole.findAll({ where: { user_id: userId } });
    const teamIds = userTeams.map((ut: any) => ut.team_id);

    return Calendar.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { assigner_id: userId },
          { team_id: { [Op.in]: teamIds } }
        ]
      },
      include: [{ model: FileModel }]
    });
  }

  async createWithRules(user: any, calendarDto: any) {
    let payload = { ...calendarDto } as any;

    if (user.role === 'admin') {
      if (!payload.user_id) payload.user_id = user.id;
    } else {
      payload.user_id = user.id;
      payload.assigner_id = null;
      payload.team_id = null;
    }

    payload.status = 'pending';

    const calendar = await Calendar.create(payload);
    return { message: 'Tạo lịch thành công', calendar };
  }

  async updateStatus(id: number, user: any, status: string, file_id?: number) {
      // 1. Lấy "xe tăng" từ Database về (Bản chính chứa hàm save)
      const calendarInstance = await Calendar.findByPk(id) as any;
      if (!calendarInstance) throw new NotFoundException('Lịch không tồn tại');

      // 2. Tạo một bản copy "sạch sẽ" (JSON thuần) CHỈ ĐỂ ĐỌC KIỂM TRA QUYỀN
      const calendar = calendarInstance.get({ plain: true });
      
      // Đọc trên bản sạch để không lo bị lỗi undefined
      if (user.role !== 'admin' && calendar.user_id !== user.id && calendar.assigner_id !== user.id){
        throw new ForbiddenException('Bạn không có quyền chuyển trạng thái');
      }

      if (status === 'completed') {
            // ÉP NÓ UPDATE TRỰC TIẾP
            await calendarInstance.update({
              status: 'completed',
              file_id: file_id // HOẶC fileId (Tuỳ vào file Model của bạn khai báo tên gì)
            });
            
          } else {
            await calendarInstance.update({
              status: 'pending',
              file_id: null
            });
          }

      // 5. Trả về kết quả (Lúc này gọi lại .get để trả về JSON sạch cho Frontend)
      return { 
        message: 'Cập nhật trạng thái thành công', 
        calendar: calendarInstance.get({ plain: true }) 
      };
    }

  async update(id: number, calendarDto: CalendarDto) {
    const calendar = await Calendar.findByPk(id);
    console.log ("calendar", calendarDto)
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
