import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Team } from './team.model';
import { Role } from './role.model';

@Table({ tableName: 'UserTeamRoles', timestamps: true })
export class UserTeamRole extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Team)
  @Column(DataType.INTEGER)
  team_id: number;

  @BelongsTo(() => Team)
  team: Team;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}
