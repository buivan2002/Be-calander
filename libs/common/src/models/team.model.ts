import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { User } from './user.model';
import { UserTeamRole } from './user-team-role.model';
import { Calendar } from './calendar.model';

@Table({ tableName: 'Teams', timestamps: true })
export class Team extends Model {
  @Column(DataType.STRING)
  name: string;

  @BelongsToMany(() => User, () => UserTeamRole)
  users: User[];

  @HasMany(() => Calendar)
  calendars: Calendar[];

  @HasMany(() => UserTeamRole)
  userTeamRoles: UserTeamRole[];
}
