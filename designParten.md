# Hướng dẫn Design Pattern & Coding Rules
*(Dựa trên cấu trúc dự án AutoSweep Backend)*

Tài liệu này tổng hợp các quy chuẩn viết code, kiến trúc hệ thống và design patterns được sử dụng, có thể đóng gói làm chuẩn để áp dụng sang các dự án Node.js/Backend khác.

## 1. Kiến trúc hệ thống (Architecture Patterns)
### 1.1 Tổ chức Multi-service (Monorepo-style)
- **Chia để trị**: Dự án chia nhỏ thành nhiều service độc lập trong thư mục `apps/` (ví dụ: `api`, `socket`, `mqtt`, `cronjob`, `worker`).
- **Shared Code (Common)**: Sử dụng kỹ thuật `module-alias` định nghĩa các alias (`@services`, `@models`, `@utils`, `@constants`, v.v.) trỏ vào thư mục dùng chung `common/`. Cách này giảm trừ triệt để việc require đường dẫn mịt mù `../../../`.

### 1.2 Event-driven Architecture
- Sử dụng **Redis Pub/Sub** để làm cầu nối giao tiếp (Event Bus) giữa các service với nhau (API <-> Socket <-> MQTT).
- Tránh việc couple chặt chẽ giữa các service với nhau HTTP requests nội bộ. Tuân thủ việc trao đổi tín hiệu qua Redis Channels định trước (VD: `api:socket:notification`, `mqtt:services:car:data`).

## 2. Design Patterns Cốt Lõi trong Source Code
### 2.1 Pattern: "Phân Tầng Rõ Ràng" (Layered Architecture)
- **Route / Router**: Nơi đăng ký đường dẫn API, gắn Middleware (như `auth`, `validate`) trước khi trỏ xuống Controller.
- **Middleware**: Nền tảng chặn bắt request (Xác thực người dùng, Validator params, Kiểm tra phân quyền).
- **Controller**: Trực tiếp nhận request, không chứa business logic phức tạp (*Thin Controller*). Nhanh chóng truyền cho *Service*.
- **Service**: Trọng tâm nghiệp vụ (*Fat Service*). Nơi xử lý format dữ liệu, thuật toán nội bộ trước khi lưu DB.
- **Model**: Khai báo cấu trúc DB và cấu hình các móc (Hooks) liên quan database.



### 2.3 Pattern: "Hỗ trợ Xử Lý Ngoại lệ" (Async Error Wrapper)
- Sử dụng hàm wrapper **`catchAsync`**: Bao bọc các hàm async controller bằng `catchAsync(async (req,res,next) => {...})`. Khi có lỗi, nó sẽ tự động `catch` được rồi `next(error)` sang hàm nhận lỗi xử lý tập trung (Global Error Handler) phía hệ thống cuối cùng. 
- Tránh hiện tượng code `try/catch` lặp lại bừa bãi.
- Lỗi được Throw ra bằng Custom Class: **`ApiError`** có chứa chi tiết message và `statusCode`.

### 2.4 Pattern: "Kiểm Soát Sở Hữu Chéo" (Resource Access Validation)
- Dạng Authorization cho nhiều khách hàng / dự án (Multitenancy-lite). Mọi Model liên hệ chéo tới project thông qua biến `projectCode`.
- Controller sẽ invoke `checkResourceAccess` middleware nhằm đối chiếu chủ sở hữu của bản ghi được query có được phép nhìn thấy do user hiện tại điều khiển không.

## 3. Các Quy chuẩn Viết Code (Coding Rules)

### 3.1 Code Style Format (Prettier & ESLint)
- **Chuẩn Prettier**: Độ dài dòng code `printWidth: 100`, Thụt lùi `tabWidth: 2`, Luôn có dấu phẩy mồ côi `trailingComma: "all"`.
- **Dấu nháy & Chấm phẩy**: Luôn dùng **ngoặc kép** (`""`) cho string, **bắt buộc chấm phẩy** (`;`) chấm dứt mọi diễn đạt hàm gán (`semi: true`).
- **Ngoặc Đơn Arrow Function**: Tuân thủ luật có ngoặc bao quanh biến của Arrow Function `(a) => {}` kể cả khi có 1 biến (`arrowParens: "always"`).
- **Hạn chế Console log**: Không lạm dụng đặt `console.log()` lên main branch (`no-console: "warn"` theo ESLint). Để lại logs thực tế thì dùng thư viện Winston log (cho phép chỉnh level, màu, format).

### 3.2 Chuẩn Database Queries
- Khuyến khích mạnh dùng tính năng xử lý đường ống trên Database (`Aggregation Pipelines`) trong Service (`$match`, `$lookup`, `$addFields`, `$project`) thay cho việc giội nhiều câu lệnh `find()` và xâu chuỗi chúng trên bộ nhớ RAM backend.

### 3.3 Chuẩn Giao thức bảo mật (Security Rules)
- Không dùng `Bcrypt` cũ lưu hậu, ưu tiên **Argon2** là thuật toán mã hóa mật khẩu mạnh mẽ. 
- Input đầu vào (body, params, queries) **BẮT BUỘC** gọi qua validator object được setup bởi thư viện `Joi`. Các biến dư thừa ngoài file cấu hình Joi Schema sẽ không được chấp nhận vào logic core bên trong.



