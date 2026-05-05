import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LifecycleTestController } from './lifecycle-test.controller';
import { LifecycleTestService } from './lifecycle-test.service';
import { LifecycleTestMiddleware } from './middleware/lifecycle-test.middleware';

@Module({
  controllers: [LifecycleTestController],
  providers: [LifecycleTestService],
})
export class LifecycleTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply middleware to the lifecycle-test controller
    consumer.apply(LifecycleTestMiddleware).forRoutes(LifecycleTestController);
  }
}
