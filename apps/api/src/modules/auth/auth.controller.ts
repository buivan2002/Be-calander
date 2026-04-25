import { Controller, Post, Body, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(loginDto);
    const customDomain = process.env.COOKIE_DOMAIN || (process.env.NODE_ENV === 'production' ? '.qanh.site' : undefined);
    
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      ...(customDomain && { domain: customDomain }),
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return result;
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    const customDomain = process.env.COOKIE_DOMAIN || (process.env.NODE_ENV === 'production' ? '.qanh.site' : undefined);
    res.clearCookie('token', { 
      path: '/',
      ...(customDomain && { domain: customDomain })
    });
    return { message: 'Đăng xuất thành công' };
  }
}
