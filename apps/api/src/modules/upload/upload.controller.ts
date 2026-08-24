import {
  BadRequestException,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { extname, join } from 'path';
import { JwtAuthGuard, FileModel } from '@app/common';

const uploadDir = join(process.cwd(), 'uploads');
const allowedExtensions =
  /\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|csv|txt)$/i;
const allowedMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'text/plain',
]);
type CreatedFileModel = FileModel & { id: number };
type CreateFileModel = (values: {
  file_name: string;
  file_path: string;
}) => Promise<CreatedFileModel>;

const createFileModel: CreateFileModel = async (values) => {
  const createdFile: unknown = await FileModel.create(values);
  return createdFile as CreatedFileModel;
};

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          mkdirSync(uploadDir, { recursive: true });
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname).toLowerCase());
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, cb) => {
        const hasAllowedExtension = allowedExtensions.test(file.originalname);
        const hasAllowedMimeType = allowedMimeTypes.has(file.mimetype);

        if (!hasAllowedExtension || !hasAllowedMimeType) {
          return cb(
            new BadRequestException(
              'Chỉ được phép tải lên ảnh hoặc file báo cáo: jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx, csv, txt',
            ),
            false,
          );
        }

        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileUrl = `/uploads/${file.filename}`;

    const dbFile = await createFileModel({
      file_name: file.originalname,
      file_path: fileUrl, // Lưu URL đầy đủ hoặc tuỳ yêu cầu, nhưng ta trả về url
    });
    const fileId = Number((dbFile as { id: unknown }).id);

    return {
      file_id: fileId,
      file_path: fileUrl, // Đóng vai trò file_url
      file_url: fileUrl,
    };
  }
}
