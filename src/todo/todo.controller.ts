import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { BearerToken } from 'src/config/bearer-token';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // Get Logged In User's Todo`s
  @Get()
  getTodo(@BearerToken() token: string | undefined) {
    return this.todoService.getTodo(token);
  }

  @Post()
  create(
    @BearerToken() token: string | undefined,
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
  ) {
    return this.todoService.create(token, createTodoDto);
  }

  @Patch(':id')
  updateTodo(
    @BearerToken() token: string | undefined,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
    @Param('id') id: number,
  ) {
    return this.todoService.updateTodo(token, updateTodoDto, id);
  }

  @Delete(':id')
  deleteTodo(
    @BearerToken() token: string | undefined,
    @Param('id') id: number,
  ) {
    return this.todoService.deleteTodo(token, id);
  }
}
