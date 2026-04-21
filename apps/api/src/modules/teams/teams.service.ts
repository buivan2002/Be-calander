import { Injectable, NotFoundException } from '@nestjs/common';
import { Team, User, UserTeamRole } from '@app/common';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  async create(userId: number, createTeamDto: CreateTeamDto) {
    const team = await Team.create({ name: createTeamDto.name } as any);
    
    // Assumes role 1 is admin/owner
    await UserTeamRole.create({
      user_id: userId,
      team_id: team.id,
      role_id: 1, 
    } as any);

    return { message: 'Tạo nhóm thành công', team };
  }

async findUserTeams(userId: number) {
  const user = await User.findByPk(userId, {
    // KHÔNG dùng raw: true ở đây
    include: [
      {
        model: Team,
        through: { attributes: ['role_id'] },
        include: [{
          model: User,
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] }
        }]
      },
    ],
  });

  if (!user) throw new NotFoundException('User not found');

  // BIẾN THÀNH JSON SẠCH Ở ĐÂY 👇
  const cleanUser = user.get({ plain: true }); 
  
  return cleanUser.teams ?? [];
}
}
