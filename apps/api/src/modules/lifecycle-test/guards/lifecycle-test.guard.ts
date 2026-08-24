import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LifecycleTestGuard implements CanActivate {
  private readonly logger = new Logger('LifecycleGuard');

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('[GUARD] Checking x-api-key');
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (apiKey !== 'test-api-key') {
      this.logger.warn(`[GUARD] Invalid or missing API key: ${apiKey}`);
      throw new UnauthorizedException('Invalid API Key');
    }

    this.logger.log('[GUARD] Access granted');
    return true;
  }
}
