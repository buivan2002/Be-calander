p# Toàn cảnh Kiến trúc Dự án Be-calander (NestJS Monorepo)

Dự án này là một hệ thống RESTful API được xây dựng trên bộ khung **NestJS Monorepo**, chuyển đổi / nâng cấp lên từ Express.js truyền thống.

## 1. Cấu trúc tổng thể (Monorepo)
Dự án áp dụng mô hình NestJS Monorepo (được cấu hình qua `nest-cli.json`), phân chia hệ thống thành 2 phân vùng chính:
- **`apps/api`**: Chứa logic xử lý nghiệp vụ chính của ứng dụng và các Application endpoints (API).
- **`libs/common`**: Chứa các thư viện và code dùng chung, cấu hình Database, các Models chung của toàn dự án, tránh lặp lại code khi quy mô dự án mở rộng.

---

## 2. Phân tách Module chi tiết

### A. Ứng dụng gốc (`apps/api/src/modules/`)
Nơi đây chứa các logic nghiệp vụ lõi (Business Logic), được thiết kế theo dạng Domain-Driven Design cơ bản (chia thành các thư mục riêng rẽ độc lập). Mỗi thư mục thường chứa Controller, Service, DTO, và Module tương ứng:
- **`auth/`**: Xử lý logic Đăng nhập/Đăng ký, mã hoá mật khẩu (argon2/bcrypt) và tạo token truy cập bằng JWT (kết hợp `passport` và `passport-jwt`).
- **`todos/`**: Quản lý lịch trình công việc/ sự kiện (Todo list).
- **`teams/`**: Quản lý các đội nhóm, kết nối nhiều người dùng với nhau.
- **`calendars/`**: Hệ thống đặt lịch/hiển thị lịch.

### B. Thư viện dùng chung (`libs/common/src/`)
Đóng vai trò làm nòng cốt "Backbone" cho tầng API:
- **`database/`**: Quản lý cấu hình khởi tạo và kết nối cơ sở dữ liệu tới MySQL, tự động truyền instance vào hệ thống qua cơ chế Injection của Nest.
- **`models/`**: Trái tim của cơ sở dữ liệu. Toàn bộ các Class Entities (Bảng CSDL) nằm ở đây (`User`, `Team`, `UserTeamRole`, `Calendar`, `Todo`, `Role`). Sử dụng `sequelize-typescript` (với các Decorators như `@Table`, `@Column`, `@BelongsToMany`, `@HasMany`) để đồng bộ code TS thành bảng MySQL.
- **`guards/`**: Các tấm chắn bảo vệ endpoint (Ví dụ: `jwt-auth.guard.ts` để chặn những ai chưa truyền Accesstoken hợp lệ).
- **`exceptions/`**: Bộ lọc (Exception Filters) bắt và đồng nhất các lỗi văng ra trong server trước khi trả JSON về cho người dùng (Format lỗi chuẩn mực).

---

## 3. Các Công nghệ và Chuẩn Coding (Design Patterns)

1. **Dependency Injection (Khởi tạo tự động)**:
   Mô hình NestJS bỏ đi việc dùng `require()... new Class()`. Thay vào đó, nó Inject các dịch vụ vào thẳng Constructor của các hàm Controller/Service (`constructor(private readonly appService: AppService)`).
   
2. **DTO (Data Transfer Object) & Validation**:
   Sử dụng `class-validator` và `class-transformer` để kiểm tra nghiêm ngặt dữ liệu đầu vào. API sẽ tự động văng ra mã lỗi 400 Bad Request nếu thông tin phía Frontend gửi lên không nằm trong khuôn khổ kiểu dữ liệu DTO đã định sẵn.

3. **Database (MySQL + Sequelize-Typescript)**:
   Xây dựng mô hình quan hệ phức tạp (như Many-to-Many giữa `User` và `Team` thông qua bảng giáp ranh `UserTeamRole`). Ở Runtime, Sequelize sử dụng kỹ thuật Lazy Evaluation (`() => Model`) để tránh lỗi treo do vòng lặp tham chiếu khép kín (Circular Dependency).

4. **Biên dịch & Module Resolution**:
   Sử dụng chuẩn `CommonJS` mặc định với trình xuất module `Node` thay vì `NodeNext` ESM khắt khe để đảm bảo kết hợp trôi chảy nhất giữa TypeScript 5.x, Webpack-bundler NestJS và TypeScript Decorators Metadata.

---

> **Tip cho quá trình phát triển:**
> Hãy giữ nguyên luồng làm việc này: _Module thiết kế Data trong `libs/common/models` -> Update cấu hình liên quan DTO -> Bơm Service vào App -> Xuất API qua Controller kết hợp Guards Auth._ Mọi nâng cấp dự án sau này, dù tạo Microservice mới hay tính năng mới đều xoay quanh vòng tròn vững chắc này.
