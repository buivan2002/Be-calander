import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserTeamRole } from './user-team-role.model';

@Table({ tableName: 'Roles', timestamps: true })
export class Role extends Model {
  @Column(DataType.STRING)
  name: string;

  @HasMany(() => UserTeamRole)
  userTeamRoles: UserTeamRole[];
}
