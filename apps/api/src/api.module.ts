import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { TeamsModule } from './modules/teams/teams.module';
import { CalendarsModule } from './modules/calendars/calendars.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    TodosModule,
    TeamsModule,
    CalendarsModule,
  ],
})
export class ApiModule {}
