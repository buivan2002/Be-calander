# Kiến Trúc Cấu Trúc Thư Mục `apps/api/`
*(Dựa trên mã nguồn AutoSweep Backend)*

Dưới đây là sơ đồ và luồng gọi chéo (pipeline) giải thích rõ file nào gọi đến file nào, cách bọc Router và vai trò của `index.js`.

---

## 1. Sơ Đồ Gọi File Của Hệ Thống API

Luồng dữ liệu của một HTTP Request khi đi vào Node.js Server sẽ được thiết kế gọi theo thứ tự chặn tầng (Layered Pattern):

```text
Request 
  👇
1. apps/api/index.js (Lớp bọc Tổng - App Initialization)
  👇
2. apps/api/v1/routes/index.js (Lớp trạm gom Router - Route Dispatcher)
  👇
3. apps/api/v1/routes/*.router.js (Lớp khai báo chi tiết - Route Declaration)
       ├── Middleware Auth (Kiểm tra Token/Quyền)
       └── Middleware Validate (Kiểm tra Joi Schema)
  👇
4. apps/api/v1/controllers/*.controller.js (Lớp điều phối - Request Handler)
  👇
5. common/services/*.service.js (Lớp nghiệp vụ - Business Logic)
  👇
Response
```

---

## 2. Chi Tiết Vai Trò Của Từng Tệp

### Tầng 1: `apps/api/index.js` - Trái Tim Hệ Thống
**Đây là file chạy gốc (Entry Point) của cả cụm API.** File này **không chứa logic kinh doanh (Business Logic) hay định nghĩa chi tiết URL**. Nó chỉ làm nhiệm vụ khai báo móng nhà:
- Nạp thư viện cốt lõi: `express`, `cors`, `passport`.
- Kết nối Cơ sở dữ liệu: `db.connect()`, `dbLog`, cấu hình `redisClient`.
- Đăng kí Global Middleware (Các màng lọc tổng): 
   - `express.json()` (để parse Body thành Object).
   - Middleware ghi nhận Nhật ký dùng chung toàn hệ thống (`actionAuditMiddleware`, `httpAuditMiddleware`...).
- Gắn Authentication cốt lõi: Xác định chiến lược giải mã Token (`passport.use("jwt", jwtStrategy)`).
- **Tuyển gọi tầng Router:** Ủy quyền toàn bộ việc quyết định đường dẫn URL cho file chuyên dụng thông qua lệnh gọi hàm: `route(app);` (với `route` được import từ `./v1/routes`).
- Gắn Global Error Handler ở cuối cùng để gom những lỗi chưa bắt được: `app.use(error.errorHandler);`.
- Lắng nghe sự kiện cắm cọc ở Port (`app.listen`).

### Tầng 2: `apps/api/v1/routes/index.js` - Trạm Phân Phối (Dispatcher)
File này nhận đối tượng `app` gốc (được truyền từ `index.js`), nhưng làm nhiệm vụ **phân nhóm API theo Feature**:
- Bẻ khóa (Prefix) hệ thống đường dẫn API ra làm 2 luồng lớn:
   - `/api/v1/` : Dành cho các tính năng của Web CMS (Admin Dashboards).
   - `/api/app/v1/` : Dành cho các App ứng dụng di động cầm tay (Mobile App).
- File sử dụng `app.use('/api/v1/user', userRouter)` để gắn (mount) bộ điều hướng nhỏ lẻ xử lý từng thực thể (user, car, project, map, ...) cho nhánh URL tương ứng.

### Tầng 3: `apps/api/v1/routes/tên_đối_tượng.router.js` - Chi Tiết Bọc Middleware
Ví dụ tại file `user.router.js`. File này đóng vai trò quyết định **HTTP Method (GET, POST, PATCH, DELETE)** và sẽ cài đặt hàng rào (Middleware) trước khi request được Controller đụng tới:
```javascript
// Ví dụ cài đặt 1 API tạo mới User:
router.post(
  "/",                                      // 1. URL Path
  auth(USER_ROLES.SUPERADMIN),              // 2. Chặn kiểm tra Token: Bắt buộc là SUPERADMIN
  validate(userValidation.createUser),      // 3. Chặn kiểm tra định dạng dữ liệu (Email hợp lệ không?...)
  userController.createUser                 // 4. Nếu 2 & 3 hợp lệ, giao việc cho Controller.
);
```

### Tầng 4: `apps/api/v1/controllers/tên_đối_tượng.controller.js` 
Là lớp nhận lệnh. Nó bọc tất cả bằng `catchAsync(async (req, res) => {...})`:
- Lấy cục dữ liệu sạch từ Request (`req.body`, `req.params`).
- Đẩy xuống nhờ vả tầng **Service** thực hiện nghiệp vụ xử lý DB bằng `await userService.createUser(...)`.
- Gói gọn kết quả và trả về cho người dùng qua HTTP: `res.status(200).send(kết quả)`.

### Tầng 5: `common/services/tên_đối_tượng.service.js` 
Đây là lõi logic thật của dự án:
- Thao tác đóng gói dữ liệu, lookup Database MongoDB.
- Chứa toàn bộ các xử lý logic phức tạp, ném ra lỗi `ApiError` nếu logic thất bại. Bất kỳ thành phần nào khác như CronJob hay Worker nếu muốn tạo 1 User cũng sẽ gọi hàm từ đây thay vì gọi trực tiếp từ Controller (Thiết kế như vậy để tái sử dụng mã nguồn mạnh mẽ).
