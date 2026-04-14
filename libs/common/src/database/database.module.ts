import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, Todo, Team, Calendar, Role, UserTeamRole } from '../models';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: (process.env.DB_DIALECT as any) || 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Todo, Team, Calendar, Role, UserTeamRole],
      autoLoadModels: true,
      synchronize: false, // Dùng schema có sẵn
      logging: false,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
