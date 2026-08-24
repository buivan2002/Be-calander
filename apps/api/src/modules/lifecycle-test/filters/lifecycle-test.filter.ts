import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class LifecycleTestFilter implements ExceptionFilter {
  private readonly logger = new Logger('LifecycleFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error('[EXCEPTION FILTER] Catching exception', exception instanceof Error ? exception.stack : exception);
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    let status = 500;
    let message: any = 'Internal server error';
    let errorResponse: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorResponse = exception.getResponse();
      
      if (typeof errorResponse === 'object' && errorResponse !== null) {
         message = (errorResponse as any).message || exception.message;
      } else {
         message = exception.message;
      }
    }

    response
      .status(status)
      .json({
        success: false,
        message,
        error: errorResponse || (exception instanceof Error ? exception.message : String(exception)),
        requestId: request['requestId'] || 'unknown',
      });
  }
}
