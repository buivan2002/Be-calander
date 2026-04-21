import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Files', timestamps: true })
export class FileModel extends Model {
  @Column(DataType.STRING)
  file_path: string;

  @Column(DataType.STRING)
  file_name: string;
}
