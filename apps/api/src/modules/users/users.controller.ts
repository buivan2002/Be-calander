import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpgradeAdminDto } from './dto/upgrade-admin.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /api/v1/users/create-admin
   * Chỉ admin mới có quyền gọi endpoint này.
   * - JwtAuthGuard: verify JWT token
   * - RolesGuard + @Roles('admin'): kiểm tra role admin
   * - Non-admin → 403 Forbidden
   */
  @Post('create-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() req: any) {
    return this.usersService.createAdmin(createAdminDto, req.user.id);
  }

  @Post('dev/upgrade-admin')
  @HttpCode(HttpStatus.OK)
  async upgradeAdmin(@Body() upgradeAdminDto: UpgradeAdminDto) {
    return this.usersService.upgradeAdminByEmail(upgradeAdminDto.email);
  }
}
