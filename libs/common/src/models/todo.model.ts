import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Todos', timestamps: false })
export class Todo extends Model {
  @Column(DataType.STRING)
  title: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.DATE)
  due_date: Date;

  @Column(DataType.BOOLEAN)
  is_completed: boolean;
}
