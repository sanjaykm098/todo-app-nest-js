import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly userService: UserService,
  ) {}

  async create(token: string | undefined, todo: CreateTodoDto) {
    const user = await this.checkAuth(token);

    const todoRecord = await this.todoRepository.save({
      ...todo,
      user_id: user.user.id,
    });

    const data = {
      todo: todoRecord,
      message: 'Todo created',
      statusCode: 201,
    };
    return data;
  }

  async getTodo(token: string | undefined) {
    const user = await this.checkAuth(token);

    const todo = await this.todoRepository.find({
      where: { user_id: user.user.id },
    });

    const data = {
      todo,
      message: 'Todo`s found',
      statusCode: 200,
    };
    return data;
  }

  async updateTodo(token: string | undefined, todo: UpdateTodoDto, id: number) {
    const user = await this.checkAuth(token);

    const todoRecord = await this.todoRepository.findOne({
      where: { id, user_id: user.user.id },
    });

    if (!todoRecord) {
      throw new UnauthorizedException('Todo not found');
    }

    await this.todoRepository.update(id, {
      ...todo,
    });

    const updatedTodoRecord = await this.todoRepository.findOne({
      where: { id, user_id: user.user.id },
    });

    const data = {
      todo: updatedTodoRecord,
      message: 'Todo updated',
      statusCode: 200,
    };

    return data;
  }

  async deleteTodo(token: string | undefined, id: number) {
    const user = await this.checkAuth(token);

    const todoRecord = await this.todoRepository.findOne({
      where: { id, user_id: user.user.id },
    });

    if (!todoRecord) {
      throw new UnauthorizedException('Todo not found');
    }

    await this.todoRepository.delete(id);

    const data = {
      message: 'Todo deleted',
      statusCode: 200,
    };

    return data;
  }

  // Check Auth
  async checkAuth(token) {
    const user = await this.userService.findUser(token);
    if (!user.user) {
      throw new UnauthorizedException(
        'Invalid token || Session expired || Unauthorized',
      );
    }
    return user;
  }
}
