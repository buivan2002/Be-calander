import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LifecycleTestInterceptor implements NestInterceptor {
  private readonly logger = new Logger('LifecycleInterceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('[INTERCEPTOR BEFORE] Before controller execution');
    const now = Date.now();
    const req = context.switchToHttp().getRequest();

    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`[INTERCEPTOR AFTER] After controller execution`)),
        map(data => {
          const executionTime = `${Date.now() - now}ms`;
          return {
            success: true,
            message: 'Lifecycle executed successfully',
            data,
            meta: {
              requestId: req.requestId,
              executionTime,
            }
          };
        }),
      );
  }
}
