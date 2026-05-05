import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Calendar, UserTeamRole, FileModel } from '@app/common';
import { CalendarDto } from './dto/calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Op } from 'sequelize';

interface AuthUser {
  id: number;
  role: string;
}

type CalendarPayload = {
  name: string | null;
  type: string | null;
  start_time: string | null;
  end_time: string | null;
  status: string | null;
  file_id: number | null;
  team_id?: number | null;
  assigner_id?: number | null;
};

type CreateCalendarPayload = Omit<CalendarDto, 'team_id' | 'assigner_id'> & {
  user_id?: number;
  status?: string;
  team_id?: number | null;
  assigner_id?: number | null;
};

@Injectable()
export class CalendarsService {
  private readonly updateFields = [
    'name',
    'type',
    'start_time',
    'end_time',
    'status',
    'file_id',
  ] as const;

  private readonly adminOnlyFields = ['team_id', 'assigner_id'] as const;

  private toPlainCalendar(calendar: Calendar): unknown {
    return calendar.get({ plain: true }) as unknown;
  }

  async findAllForAdmin() {
    return Calendar.findAll({ include: [{ model: FileModel }] });
  }

  async findAllForUser(userId: number) {
    const userTeams = await UserTeamRole.findAll({
      where: { user_id: userId },
      raw: true,
      attributes: ['team_id'],
    });
    const teamIds = userTeams.map((ut) => ut.team_id);

    return Calendar.findAll({
      where: {
        [Op.or]: [
          { user_id: userId },
          { assigner_id: userId },
          { assigner_id: null, team_id: { [Op.in]: teamIds } },
        ],
      },
      include: [{ model: FileModel }],
      raw: true,
      nest: true,
    });
  }

  async createWithRules(user: AuthUser, calendarDto: CalendarDto) {
    const payload: CreateCalendarPayload = { ...calendarDto };

    if (user.role === 'admin') {
      if (!payload.user_id) payload.user_id = user.id;
    } else {
      payload.user_id = user.id;
      payload.assigner_id = null;
      payload.team_id = null;
    }

    payload.status = 'pending';

    const calendar = await Calendar.create(payload as never);
    return {
      message: 'Tạo lịch thành công',
      calendar: this.toPlainCalendar(calendar),
    };
  }

  private isAdmin(user: AuthUser) {
    return user.role === 'admin';
  }

  private isAssigner(user: AuthUser, calendar: Calendar) {
    return Number(calendar.assigner_id) === user.id;
  }

  private async isTeamMember(user: AuthUser, calendar: Calendar) {
    if (!calendar.team_id) return false;

    const membership = await UserTeamRole.findOne({
      where: {
        user_id: user.id,
        team_id: calendar.team_id,
      },
      attributes: ['id'],
    });

    return Boolean(membership);
  }

  private async canUpdateCalendar(user: AuthUser, calendar: Calendar) {
    if (this.isAdmin(user)) return true;
    if (this.isAssigner(user, calendar)) return true;
    if (calendar.assigner_id === null) return this.isTeamMember(user, calendar);

    return false;
  }

  private async assertCanUpdateCalendar(user: AuthUser, calendar: Calendar) {
    const canUpdate = await this.canUpdateCalendar(user, calendar);

    if (!canUpdate) {
      throw new ForbiddenException('Bạn không có quyền cập nhật lịch này');
    }
  }

  private assertAdminOnlyFields(
    user: AuthUser,
    calendar: Calendar,
    dto: UpdateCalendarDto,
  ) {
    if (this.isAdmin(user)) return;

    for (const field of this.adminOnlyFields) {
      // Sau ValidationPipe + transform, DTO instance có thể vẫn "có" field dù client không gửi.
      // Với admin-only fields, chỉ coi là đang update khi client thực sự truyền giá trị khác undefined.
      if (dto[field] === undefined) continue;

      const incomingValue = dto[field] ?? null;
      const currentValue = calendar[field] ?? null;
      if (incomingValue !== currentValue) {
        throw new ForbiddenException(`Bạn không có quyền cập nhật ${field}`);
      }
    }
  }

  private normalizeUpdatePayload(
    user: AuthUser,
    dto: UpdateCalendarDto,
  ): CalendarPayload {
    const payload = this.updateFields.reduce((result, field) => {
      return {
        ...result,
        [field]: dto[field] ?? null,
      };
    }, {} as CalendarPayload);

    if (this.isAdmin(user)) {
      payload.team_id = dto.team_id ?? null;
      payload.assigner_id = dto.assigner_id ?? null;
    }

    return payload;
  }

  async updateStatus(
    id: number,
    user: AuthUser,
    status: string,
    file_id?: number,
  ) {
    const calendarInstance = await Calendar.findByPk(id);
    if (!calendarInstance) throw new NotFoundException('Lịch không tồn tại');

    await this.assertCanUpdateCalendar(user, calendarInstance);

    if (!['completed', 'pending'].includes(status)) {
      throw new BadRequestException('Trạng thái không hợp lệ');
    }

    const payload =
      status === 'completed'
        ? { status: 'completed', file_id: file_id ?? null }
        : { status: 'pending', file_id: null };

    await calendarInstance.update(payload);

    return {
      message: 'Cập nhật trạng thái thành công',
      calendar: this.toPlainCalendar(calendarInstance),
    };
  }

  async update(id: number, user: AuthUser, calendarDto: UpdateCalendarDto) {
    const calendarInstance = await Calendar.findByPk(id);

    // Phải check tồn tại trước khi lột giáp
    if (!calendarInstance) throw new NotFoundException('Lịch không tồn tại');

    const calendar = calendarInstance.get({ plain: true });

    await this.assertCanUpdateCalendar(user, calendar);
    this.assertAdminOnlyFields(user, calendar, calendarDto);

    const payload = this.normalizeUpdatePayload(user, calendarDto);

    await Calendar.update(payload, { where: { id } });
    return {
      message: 'Cập nhật thành công',
      calendar: calendar,
    };
  }

  async remove(id: number) {
    const calendar = await Calendar.findByPk(id);
    if (!calendar) throw new NotFoundException('Lịch không tồn tại');
    await calendar.destroy();
    return { message: 'Xóa thành công' };
  }
}
