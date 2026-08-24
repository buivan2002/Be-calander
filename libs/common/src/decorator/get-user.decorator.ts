import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Xây dựng tờ Note có tên là @GetUser
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Trả về thông tin user đã được Bác bảo vệ nhét vào
  },
);