import {
  Injectable,
  Logger,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { LifecycleTestDto } from './dto/lifecycle-test.dto';

@Injectable()
export class LifecycleTestService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  private readonly logger = new Logger('LifecycleService');

  onModuleInit() {
    this.logger.log('[HOOK] Module initialized (OnModuleInit)');
  }

  onApplicationBootstrap() {
    this.logger.log('[HOOK] App bootstrap completed (OnApplicationBootstrap)');
  }

  onModuleDestroy() {
    this.logger.log('[HOOK] Module destruction started (OnModuleDestroy)');
  }

  beforeApplicationShutdown(signal: string) {
    this.logger.log(`[HOOK] Before application shutdown (BeforeApplicationShutdown) - signal: ${signal}`);
  }

  onApplicationShutdown(signal: string) {
    this.logger.log(`[HOOK] Application shutdown (OnApplicationShutdown) - signal: ${signal}`);
  }

  async processRequest(data: LifecycleTestDto) {
    this.logger.log('[SERVICE] Processing request...');
    
    // Simulate DB insert latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    this.logger.log('[SERVICE] Request processed successfully.');
    
    return {
      ...data,
      createdAt: new Date().toISOString(),
    };
  }
}
