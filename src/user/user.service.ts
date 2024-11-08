import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { BearerToken } from 'src/config/bearer-token';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<object> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.password !== loginUserDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      message: 'Login successful',
      statusCode: 200,
    };
  }

  async findUser(@BearerToken() token: string | undefined) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException(
        'Invalid token || Session expired || Unauthorized',
      );
    }
    if (!decoded || !decoded.email) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials || Session expired');
    }
    const expiryTimeStamp = decoded.exp;
    const expiryTime = new Date(expiryTimeStamp * 1000).toLocaleString();
    user.password = undefined;

    const data = {
      user,
      message: 'User found',
      statusCode: 200,
      expiryTime,
    };
    return data;
  }

  async checkAuth(@BearerToken() token: string | undefined) {
    let decoded: any;
    try {
      decoded = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException(
        'Invalid token || Session expired || Unauthorized',
      );
    }
    if (!decoded || !decoded.email) {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.userRepository.findOne({
      where: { email: decoded.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials || Session expired');
    }
    return user;
  }
}
