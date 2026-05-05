import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Team, User, UserTeamRole, Role } from '@app/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { Op } from 'sequelize'; // Nhớ import Op ở đầu file

interface PlainRole {
  id: number;
  name: string;
}

interface PlainTeamUser {
  id: number;
  name: string;
  email: string;
}

interface PlainTeamRole {
  user_id: number;
  role?: PlainRole;
}

interface PlainTeam {
  id: number;
  name: string;
  users?: PlainTeamUser[];
  userTeamRoles?: PlainTeamRole[];
}

interface ModelWithPlainGetter {
  get(options: { plain: true }): unknown;
}

@Injectable()
export class TeamsService {
  private readonly adminRoleName = 'Admin';
  private readonly memberRoleName = 'Member';

  private async ensureTeamRoles() {
    const [adminRole] = await Role.findOrCreate({
      where: { id: 1 },
      defaults: { name: this.adminRoleName },
    });

    const [memberRole] = await Role.findOrCreate({
      where: { id: 2 },
      defaults: { name: this.memberRoleName },
    });

    return { adminRole, memberRole };
  }

  private async ensureTeamAdmin(userId: number, teamId: number) {
    const membershipInstance = await UserTeamRole.findOne({
      where: { user_id: userId, team_id: teamId },
      include: [{ model: Role, attributes: ['id', 'name'] }],
    });

    if (!membershipInstance) {
      throw new ForbiddenException('Bạn không thuộc team này');
    }

    const membership = membershipInstance.get({ plain: true });

    if (membership.role?.name !== this.adminRoleName) {
      throw new ForbiddenException('Bạn không có quyền quản lý team này');
    }

    return membership;
  }

  private hasPlainGetter(team: unknown): team is ModelWithPlainGetter {
    return (
      typeof team === 'object' &&
      team !== null &&
      'get' in team &&
      typeof (team as { get?: unknown }).get === 'function'
    );
  }

  private formatTeam(team: Team | PlainTeam) {
    const cleanTeam = (
      this.hasPlainGetter(team) ? team.get({ plain: true }) : team
    ) as PlainTeam;
    const rolesByUserId = new Map<number, { id: number; name: string }>();

    (cleanTeam.userTeamRoles ?? []).forEach((item: PlainTeamRole) => {
      if (item.user_id && item.role) {
        rolesByUserId.set(item.user_id, item.role);
      }
    });

    const users = (cleanTeam.users ?? []).map((user: PlainTeamUser) => {
      const role = rolesByUserId.get(user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: role?.id,
        roleName: role?.name,
      };
    });

    return {
      id: Number(cleanTeam.id),
      name: cleanTeam.name,
      users,
      memberCount: users.length,
    };
  }

  private async findTeamById(teamId: number) {
    const team = await Team.findByPk(teamId, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
        {
          model: UserTeamRole,
          attributes: ['user_id', 'role_id'],
          include: [{ model: Role, attributes: ['id', 'name'] }],
        },
      ],
    });

    if (!team) {
      throw new NotFoundException('Team not found');
    }

    return team;
  }

  async create(userId: number, createTeamDto: CreateTeamDto) {
    const { name, members } = createTeamDto; // members là mảng email: ['a@gmail.com', 'b@gmail.com']

    // 🚀 BƯỚC 1: DỌN ĐƯỜNG BẢNG ROLES (Khắc phục triệt để lỗi Foreign Key)
    const { adminRole, memberRole } = await this.ensureTeamRoles();

    // 🚀 BƯỚC 2: TẠO TEAM
    const team = await Team.create({ name });

    // 🚀 BƯỚC 3: PHIÊN DỊCH EMAIL SANG ID
    let memberIds: number[] = [];

    if (members && members.length > 0) {
      const foundUsers = await User.findAll({
        where: {
          email: {
            [Op.in]: members, // Tìm tất cả user có email trong mảng
          },
        },
        attributes: ['id'],
      });

      memberIds = Array.from(
        new Set(foundUsers.map((user) => Number(user.id))),
      ).filter((id) => id !== userId);
    }

    // 🚀 BƯỚC 4: LÊN DANH SÁCH & LƯU VÀO DATABASE
    const bulkData = [
      // Người tạo team (Dùng ID từ biến userId của bạn, role từ biến adminRole)
      {
        user_id: userId,
        team_id: Number(team.id),
        role_id: Number(adminRole.id),
      },

      // Các thành viên được add vào từ mảng email
      ...memberIds.map((id: number) => ({
        user_id: id,
        team_id: Number(team.id),
        role_id: Number(memberRole.id),
      })),
    ];

    // Bấm nút lưu 1 lần duy nhất cho toàn bộ!
    await UserTeamRole.bulkCreate(bulkData);

    const createdTeam = await this.findTeamById(Number(team.id));
    return {
      message: 'Tạo nhóm thành công',
      team: this.formatTeam(createdTeam),
    };
  }

  async findUserTeams(userId: number) {
    const user = await User.findByPk(userId, {
      // KHÔNG dùng raw: true ở đây
      include: [
        {
          model: Team,
          through: { attributes: ['role_id'] },
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email'],
              through: { attributes: [] },
            },
            {
              model: UserTeamRole,
              attributes: ['user_id', 'role_id'],
              include: [{ model: Role, attributes: ['id', 'name'] }],
            },
          ],
        },
      ],
    });

    if (!user) throw new NotFoundException('User not found');

    // BIẾN THÀNH JSON SẠCH Ở ĐÂY 👇
    const cleanUser = user.get({ plain: true }) as { teams?: PlainTeam[] };

    return (cleanUser.teams ?? []).map((team: PlainTeam) =>
      this.formatTeam(team),
    );
  }

  async addMember(requestUserId: number, teamId: number, email: string) {
    const { memberRole } = await this.ensureTeamRoles();
    await this.ensureTeamAdmin(requestUserId, teamId);

    const user = await User.findOne({ where: { email }, attributes: ['id'] });

    if (!user) {
      throw new NotFoundException('Không tìm thấy user với email này');
    }

    const existingMembership = await UserTeamRole.findOne({
      where: { user_id: user.id, team_id: teamId },
    });

    if (existingMembership) {
      throw new BadRequestException('User đã là thành viên của team');
    }

    await UserTeamRole.create({
      user_id: user.id,
      team_id: teamId,
      role_id: Number(memberRole.id),
    });

    const team = await this.findTeamById(teamId);
    return {
      message: 'Thêm thành viên thành công',
      team: this.formatTeam(team),
    };
  }

  async removeMember(requestUserId: number, teamId: number, userId: number) {
    await this.ensureTeamAdmin(requestUserId, teamId);

    const membership = await UserTeamRole.findOne({
      where: { user_id: userId, team_id: teamId },
      include: [{ model: Role, attributes: ['id', 'name'] }],
    });

    if (!membership) {
      throw new NotFoundException('Thành viên không tồn tại trong team');
    }

    if (membership.role?.name === this.adminRoleName) {
      const adminCount = await UserTeamRole.count({
        where: { team_id: teamId, role_id: membership.role_id },
      });

      if (adminCount <= 1) {
        throw new BadRequestException('Team phải còn ít nhất một admin');
      }
    }

    await membership.destroy();

    const team = await this.findTeamById(teamId);
    return {
      message: 'Xóa thành viên thành công',
      team: this.formatTeam(team),
    };
  }

  async demoteMember(requestUserId: number, teamId: number, userId: number) {
    const { memberRole } = await this.ensureTeamRoles();
    await this.ensureTeamAdmin(requestUserId, teamId);

    const membership = await UserTeamRole.findOne({
      where: { user_id: userId, team_id: teamId },
      include: [{ model: Role, attributes: ['id', 'name'] }],
    });

    if (!membership) {
      throw new NotFoundException('Thành viên không tồn tại trong team');
    }

    if (membership.role_id === memberRole.id) {
      throw new BadRequestException('Thành viên đã là Member');
    }

    if (membership.role?.name === this.adminRoleName) {
      const adminCount = await UserTeamRole.count({
        where: { team_id: teamId, role_id: membership.role_id },
      });

      if (adminCount <= 1) {
        throw new BadRequestException('Team phải còn ít nhất một admin');
      }
    }

    await membership.update({ role_id: Number(memberRole.id) });

    const team = await this.findTeamById(teamId);
    return {
      message: 'Hạ quyền thành viên thành công',
      team: this.formatTeam(team),
    };
  }
}
