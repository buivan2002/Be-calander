import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { User } from '@app/common';
import * as argon2 from 'argon2';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  async createAdmin(createAdminDto: CreateAdminDto, creatorId: number) {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại');
    }

    // Hash password
    const hashedPassword = await argon2.hash(createAdminDto.password);

    // Tạo user mới với role = admin (hardcode từ backend)
    const newAdmin = await User.create({
      email: createAdminDto.email,
      password: hashedPassword,
      name: createAdminDto.email.split('@')[0], // Tạo tên mặc định từ email
      role: 'admin', // HARDCODE - không nhận từ client
      is_active: true,
    } as any);

    // Audit logging
    this.logger.log(
      `Admin #${creatorId} đã tạo tài khoản admin mới #${newAdmin.id} (${createAdminDto.email})`,
    );

    return {
      message: 'Tạo tài khoản admin thành công',
      user: {
        id: newAdmin.id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    };
  }
}
