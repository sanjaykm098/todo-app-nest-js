import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from 'src/config/public-strategy';
import { BearerToken } from 'src/config/bearer-token';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Login User
  @Public()
  @Post('login')
  @HttpCode(200)
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto): object {
    return this.userService.login(loginUserDto);
  }

  // Find User
  @Get('find')
  findUser(@BearerToken() token: string | undefined) {
    return this.userService.findUser(token);
  }
}
