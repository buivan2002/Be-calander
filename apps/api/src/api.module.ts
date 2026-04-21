import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { TeamsModule } from './modules/teams/teams.module';
import { CalendarsModule } from './modules/calendars/calendars.module';
import { UploadModule } from './modules/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TodosModule,
    TeamsModule,
    CalendarsModule,
    UploadModule,
    ServeStaticModule.forRoot({
      // 1. Thay __dirname bằng process.cwd()
      rootPath: join(process.cwd(), 'uploads'), 
      
      // 2. Đường dẫn bắt đầu trên URL
      serveRoot: '/uploads', 
      
      // 3. Tắt tính năng tự động đi tìm index.html cho đỡ lỗi vặt
      serveStaticOptions: {
        fallthrough: false, 
      },
    }),
  ],
})
export class ApiModule {}
