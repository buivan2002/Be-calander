import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '@app/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  async findAll() {
    return Todo.findAll();
  }

  async create(createTodoDto: CreateTodoDto) {
    const todo = await Todo.create({
      ...createTodoDto,
      is_completed: false,
    } as any);
    return { message: 'Tạo công việc thành công', todo };
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new NotFoundException('Không tìm thấy công việc');
    
    await todo.update(updateTodoDto);
    return { message: 'Cập nhật thành công', todo };
  }

  async remove(id: number) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new NotFoundException('Không tìm thấy công việc');

    await todo.destroy();
    return { message: 'Xóa thành công' };
  }

  async checkTodo(id: number) {
    const todo = await Todo.findByPk(id);
    if (!todo) throw new NotFoundException('Không tìm thấy công việc');

    await todo.update({ is_completed: true });
    return { message: 'Đánh dấu hoàn thành thành công', todo };
  }
}
