import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Team } from './team.model';
import { FileModel } from './file.model';

@Table({ tableName: 'Calendars', timestamps: true })
export class Calendar extends Model {
  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  type: string;

  @Column(DataType.DATE)
  start_time: Date;

  @Column(DataType.DATE)
  end_time: Date;

  @Column(DataType.STRING)
  status: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  assigner_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @BelongsTo(() => User, 'assigner_id')
  assignee: User;

  @ForeignKey(() => Team)
  @Column(DataType.INTEGER)
  team_id: number;

  @BelongsTo(() => Team)
  team: Team;

  @ForeignKey(() => FileModel)
  @Column(DataType.INTEGER)
  file_id: number;

  @BelongsTo(() => FileModel)
  file: FileModel;
}
