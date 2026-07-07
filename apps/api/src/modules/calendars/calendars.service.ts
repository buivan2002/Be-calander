import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Calendar, UserTeamRole, FileModel, User } from '@app/common';
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
  progress_percent: number | null;
  estimate_hours: number | null;
  actual_hours: number | null;
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
  private readonly localTimezoneOffsetMs = 7 * 60 * 60 * 1000;

  private readonly updateFields = [
    'name',
    'type',
    'start_time',
    'end_time',
    'status',
    'progress_percent',
    'estimate_hours',
    'actual_hours',
    'file_id',
  ] as const;

  private readonly adminOnlyFields = ['team_id', 'assigner_id'] as const;

  private toPlainCalendar(calendar: Calendar): unknown {
    return calendar.get({ plain: true }) as unknown;
  }

  private normalizeHours(value: unknown, fallback = 0) {
    if (value === null || value === undefined || value === '') return fallback;
    return Number(value);
  }

  private normalizeProgress(value: unknown, fallback = 0) {
    if (value === null || value === undefined || value === '') return fallback;
    return Number(value);
  }

  private statusFromProgress(progress: number) {
    return progress === 100 ? 'completed' : 'pending';
  }

  private formatLocalDate(date: Date) {
    return new Date(date.getTime() + this.localTimezoneOffsetMs)
      .toISOString()
      .slice(0, 10);
  }

  private parseWeekStart(weekStart: string) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(weekStart)) {
      throw new BadRequestException('week_start phải có định dạng YYYY-MM-DD');
    }

    const parsed = new Date(`${weekStart}T00:00:00.000+07:00`);
    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException('week_start không hợp lệ');
    }

    return parsed;
  }

  private async getUserTeamIds(userId: number) {
    const userTeams = await UserTeamRole.findAll({
      where: { user_id: userId },
      raw: true,
      attributes: ['team_id'],
    });

    return userTeams.map((ut) => Number(ut.team_id)).filter(Boolean);
  }

  private parseOptionalUserId(userId?: string) {
    if (userId === undefined || userId === '') return null;

    const parsed = Number(userId);
    if (!Number.isInteger(parsed) || parsed <= 0) {
      throw new BadRequestException('user_id không hợp lệ');
    }

    return parsed;
  }

  private async assertCanViewUser(user: AuthUser, targetUserId: number) {
    if (this.isAdmin(user)) return;
    if (user.id === targetUserId) return;

    const teamIds = await this.getUserTeamIds(user.id);
    if (teamIds.length === 0) {
      throw new ForbiddenException('Bạn không có quyền xem người dùng này');
    }

    const sharedMembership = await UserTeamRole.findOne({
      where: {
        user_id: targetUserId,
        team_id: { [Op.in]: teamIds },
      },
      attributes: ['id'],
    });

    if (!sharedMembership) {
      throw new ForbiddenException('Bạn không có quyền xem người dùng này');
    }
  }

  async findAllForAdmin() {
    return Calendar.findAll({ include: [{ model: FileModel }] });
  }

  async findAllForUser(user: AuthUser, userId?: string) {
    const targetUserId = this.parseOptionalUserId(userId);

    if (targetUserId) {
      await this.assertCanViewUser(user, targetUserId);

      return Calendar.findAll({
        where: {
          [Op.or]: [{ user_id: targetUserId }, { assigner_id: targetUserId }],
        },
        include: [{ model: FileModel }],
        raw: true,
        nest: true,
      });
    }

    if (this.isAdmin(user)) {
      return this.findAllForAdmin();
    }

    const teamIds = await this.getUserTeamIds(user.id);
    return Calendar.findAll({
      where: {
        [Op.or]: [
          { user_id: user.id },
          { assigner_id: user.id },
          { assigner_id: null, team_id: { [Op.in]: teamIds } },
        ],
      },
      include: [{ model: FileModel }],
      raw: true,
      nest: true,
    });
  }

  async findPermittedAssignees(user: AuthUser) {
    if (this.isAdmin(user)) {
      return User.findAll({
        attributes: ['id', 'name', 'email', 'role'],
        order: [['name', 'ASC']],
        raw: true,
      });
    }

    const teamIds = await this.getUserTeamIds(user.id);
    const userIds = new Set<number>([user.id]);

    if (teamIds.length > 0) {
      const memberships = await UserTeamRole.findAll({
        where: { team_id: { [Op.in]: teamIds } },
        raw: true,
        attributes: ['user_id'],
      });

      memberships.forEach((membership) => {
        if (membership.user_id) userIds.add(Number(membership.user_id));
      });
    }

    return User.findAll({
      where: { id: { [Op.in]: Array.from(userIds) } },
      attributes: ['id', 'name', 'email', 'role'],
      order: [['name', 'ASC']],
      raw: true,
    });
  }

  async findWeeklyWorkload(user: AuthUser, targetUserId: number, weekStart: string) {
    await this.assertCanViewUser(user, targetUserId);

    const targetUser = await User.findByPk(targetUserId, {
      attributes: ['id', 'name', 'email', 'role'],
      raw: true,
    });
    if (!targetUser) throw new NotFoundException('User không tồn tại');

    const start = this.parseWeekStart(weekStart);
    const endExclusive = new Date(start);
    endExclusive.setUTCDate(endExclusive.getUTCDate() + 7);

    const calendars = await Calendar.findAll({
      where: {
        start_time: {
          [Op.gte]: start,
          [Op.lt]: endExclusive,
        },
        [Op.or]: [{ assigner_id: targetUserId }, { user_id: targetUserId }],
      },
      order: [['start_time', 'ASC']],
      raw: true,
    });

    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + index);
      return {
        date: this.formatLocalDate(date),
        estimate_hours: 0,
        actual_hours: 0,
        tasks: [] as unknown[],
      };
    });

    const daysByDate = new Map(days.map((day) => [day.date, day]));

    calendars.forEach((calendar) => {
      const date = this.formatLocalDate(new Date(calendar.start_time));
      const day = daysByDate.get(date);
      if (!day) return;

      const estimateHours = this.normalizeHours(calendar.estimate_hours, 0);
      const actualHours = this.normalizeHours(calendar.actual_hours, 0);

      day.estimate_hours += estimateHours;
      day.actual_hours += actualHours;
      day.tasks.push({
        id: calendar.id,
        name: calendar.name,
        type: calendar.type,
        status: calendar.status,
        progress_percent: calendar.progress_percent,
        estimate_hours: estimateHours,
        actual_hours: actualHours,
        start_time: calendar.start_time,
        end_time: calendar.end_time,
      });
    });

    const totals = days.reduce(
      (result, day) => ({
        estimate_hours: result.estimate_hours + day.estimate_hours,
        actual_hours: result.actual_hours + day.actual_hours,
      }),
      { estimate_hours: 0, actual_hours: 0 },
    );

    const weekEnd = new Date(endExclusive);
    weekEnd.setUTCDate(weekEnd.getUTCDate() - 1);

    return {
      user: targetUser,
      week_start: this.formatLocalDate(start),
      week_end: this.formatLocalDate(weekEnd),
      estimate_hours: totals.estimate_hours,
      actual_hours: totals.actual_hours,
      days,
    };
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

    payload.progress_percent = this.normalizeProgress(payload.progress_percent, 0);
    payload.estimate_hours =
      payload.estimate_hours === undefined ? null : payload.estimate_hours;
    payload.actual_hours = this.normalizeHours(payload.actual_hours, 0);
    payload.status = this.statusFromProgress(payload.progress_percent);

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

  private isOwner(user: AuthUser, calendar: Calendar) {
    return Number(calendar.user_id) === user.id;
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
    if (this.isOwner(user, calendar)) return true;
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
    calendar: CalendarPayload,
    dto: UpdateCalendarDto,
  ): CalendarPayload {
    const payload = this.updateFields.reduce((result, field) => {
      return {
        ...result,
        [field]: dto[field] === undefined ? calendar[field] ?? null : dto[field],
      };
    }, {} as CalendarPayload);

    const currentProgress = this.normalizeProgress(
      dto.progress_percent,
      this.normalizeProgress(calendar.progress_percent, 0),
    );
    payload.progress_percent = currentProgress;
    payload.status = this.statusFromProgress(currentProgress);
    payload.actual_hours = this.normalizeHours(
      dto.actual_hours,
      this.normalizeHours(calendar.actual_hours, 0),
    );
    payload.estimate_hours =
      dto.estimate_hours === undefined
        ? calendar.estimate_hours ?? null
        : dto.estimate_hours;

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
        ? { status: 'completed', progress_percent: 100, file_id: file_id ?? null }
        : { status: 'pending', progress_percent: 0, file_id: null };

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

    const payload = this.normalizeUpdatePayload(user, calendar, calendarDto);

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
