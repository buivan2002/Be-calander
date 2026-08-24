import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Team } from './team.model';
import { UserTeamRole } from './user-team-role.model';
import { Calendar } from './calendar.model';

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  role: string;

  @Column(DataType.BOOLEAN)
  is_active: boolean;

  @BelongsToMany(() => Team, () => UserTeamRole)
  teams: Team[];

  @HasMany(() => Calendar)
  calendars: Calendar[];

  @HasMany(() => UserTeamRole)
  userTeamRoles: UserTeamRole[];
}
