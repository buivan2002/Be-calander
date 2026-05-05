import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LifecycleTestMiddleware implements NestMiddleware {
  private readonly logger = new Logger('LifecycleMiddleware');

  use(req: Request, res: Response, next: NextFunction) {
    // Generate a simple requestId (in real app, use UUID)
    const requestId = Math.random().toString(36).substring(2, 8);
    req['requestId'] = requestId;
    req['timestamp'] = Date.now();

    this.logger.log(`[MIDDLEWARE] ${req.method} ${req.originalUrl} requestId=${requestId}`);
    
    next();
  }
}
