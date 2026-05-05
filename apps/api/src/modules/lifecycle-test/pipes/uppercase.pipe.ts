import { PipeTransform, Injectable, ArgumentMetadata, Logger } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  private readonly logger = new Logger('LifecyclePipe');

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`[PIPE] Transforming ${metadata.type}`);
    if (metadata.type === 'body' && value && typeof value.name === 'string') {
      value.name = value.name.toUpperCase();
      this.logger.log(`[PIPE] Name transformed to uppercase: ${value.name}`);
    }
    return value;
  }
}
