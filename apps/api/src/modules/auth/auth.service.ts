import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@app/common';
import * as argon2 from 'argon2';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await User.findOne({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const hashedPassword = await argon2.hash(registerDto.password);
    
    const user = await User.create({
      name: registerDto.fname,
      email: registerDto.email,
      password: hashedPassword,
      role: 'user',
      is_active: true,
    } as any);

    return { message: 'Đăng ký thành công', user: { id: user.id, email: user.email, name: user.name } };
  }

  async login(loginDto: LoginDto) {
    const user = await User.findOne({ 
      where: { email: loginDto.email },
      raw: true // <--- "Vũ khí" bí mật ở đây
    });
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    const isPasswordValid = await argon2.verify(user.password, loginDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { message: 'Đăng nhập thành công', token, user: { id: user.id, email: user.email, role: user.role } };
  }
}
