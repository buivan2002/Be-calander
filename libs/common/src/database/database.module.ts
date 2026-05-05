import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  User,
  Todo,
  Team,
  Calendar,
  Role,
  UserTeamRole,
  FileModel,
} from '../models';
import * as dotenv from 'dotenv';

import * as fs from 'fs';
import * as path from 'path';

const envPath = fs.existsSync(path.resolve(process.cwd(), '.env.development'))
  ? path.resolve(process.cwd(), '.env.development')
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: (process.env.DB_DIALECT as any) || 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Todo, Team, Calendar, Role, UserTeamRole, FileModel],
      autoLoadModels: true,
      synchronize: false, // Dùng schema có sẵn
      logging: false,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
