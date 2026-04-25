import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard, FileModel } from '@app/common';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },

      // 2. BỘ LỌC TỆP TIN: Chỉ nhận ảnh (JPEG, PNG)
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          // Nếu không phải ảnh, báo lỗi và không cho upload
          return cb(new Error('Chỉ được phép tải lên file ảnh!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) return { error: 'No file uploaded' };
    const fileUrl = `/uploads/${file.filename}`;
    
    const dbFile = await FileModel.create({
      file_name: file.originalname,
      file_path: fileUrl, // Lưu URL đầy đủ hoặc tuỳ yêu cầu, nhưng ta trả về url
    } as any);

    return { 
      file_id: dbFile.id, 
      file_path: fileUrl,    // Đóng vai trò file_url
      file_url: fileUrl 
    };
  }
}
