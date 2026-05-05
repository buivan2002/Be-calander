import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { LifecycleTestService } from './lifecycle-test.service';
import { LifecycleTestDto } from './dto/lifecycle-test.dto';
import { LifecycleTestGuard } from './guards/lifecycle-test.guard';
import { LifecycleTestInterceptor } from './interceptors/lifecycle-test.interceptor';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { LifecycleTestFilter } from './filters/lifecycle-test.filter';

@Controller('lifecycle-test')
@UseGuards(LifecycleTestGuard)
@UseInterceptors(LifecycleTestInterceptor)
@UseFilters(LifecycleTestFilter)
export class LifecycleTestController {
  private readonly logger = new Logger('LifecycleController');

  constructor(private readonly lifecycleTestService: LifecycleTestService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }), UppercasePipe)
  async createTest(@Body() body: LifecycleTestDto) {
    this.logger.log('[CONTROLLER] Handling POST /lifecycle-test request');
    return this.lifecycleTestService.processRequest(body);
  }
}
