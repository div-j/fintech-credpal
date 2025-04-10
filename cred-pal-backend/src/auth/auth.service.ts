import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {

    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    // hashPassword
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // return user without password
    return { message: 'User registered successfully', user };
  }

  async login(loginDto: LoginDto) {

    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload);
    
    return { accessToken: token, user: { id: user.id, email: user.email, fullName: user.fullName } };
  }
}
