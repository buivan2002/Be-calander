import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController, CheckTodosController } from './todos.controller';

@Module({
  controllers: [TodosController, CheckTodosController],
  providers: [TodosService],
})
export class TodosModule {}
