# Be-Calendar Backend

## 📋 Project Overview

**Be-Calendar** là backend API cho ứng dụng quản lý lịch và công việc nhóm. Cung cấp các chức năng:
- Quản lý công việc cá nhân (Todos)
- Xác thực người dùng (Đăng ký/Đăng nhập)
- Quản lý nhóm/đội
- Quản lý lịch nhóm
- Phân quyền người dùng trong nhóm

---

## 🛠️ Tech Stack

| Công nghệ | Phiên bản | Mục đích |
|-----------|----------|---------|
| **Express.js** | 5.1.0 | Webframework chính |
| **Node.js** | - | Runtime |
| **Sequelize** | 6.37.7 | ORM quản lý database |
| **MySQL2** | 3.14.1 | Database driver |
| **Redis** | (ioredis 5.6.1) | Cache/Session store |
| **JWT** | 9.0.2 | Xác thực token |
| **bcrypt** | 6.0.0 | Mã hóa password |
| **CORS** | 2.8.5 | Cross-origin requests |
| **Nodemon** | 3.1.10 | Auto-reload dev |

---

## 📁 Project Structure

```
Be-calander/
├── config/              # Cấu hình database
│   └── config.js       # Sequelize config (development/production)
├── controllers/         # Business logic
│   ├── todos.js        # CRUD công việc
│   ├── login.js        # Đăng ký/Đăng nhập
│   ├── team.js         # Quản lý nhóm
│   └── calendar.js     # Quản lý lịch
├── models/             # Sequelize models (ORM)
│   ├── user.js         # User model
│   ├── todo.js         # Todo model
│   ├── team.js         # Team model
│   ├── calendar.js     # Calendar model
│   ├── role.js         # Role model
│   ├── userteamrole.js # Join table (User-Team-Role)
│   └── index.js        # Sequelize initialization
├── middlewares/
│   └── auth.js         # JWT authentication middleware
├── migrations/         # Database schema migrations
│   ├── *-create-todos.js
│   ├── *-create-user.js
│   ├── *-create-team.js
│   ├── *-create-role.js
│   └── *-create-user-team-role.js
├── routes/
│   └── index.js        # API endpoint definitions
├── seeders/            # Dữ liệu mẫu
│   └── *-seed-roles.js
├── main.js             # Server entry point
├── db.js               # Knex database config
├── package.json        # Dependencies
└── .env               # Environment variables
```

---

## 📊 Database Models & Relationships

### **Users (Người dùng)**
- `id` - Primary Key
- `name` - Tên người dùng
- `email` - Email (unique)
- `password` - Mật khẩu (bcrypt hashed)
- `role` - Vai trò ("user", "admin",...)
- `is_active` - Trạng thái kích hoạt
- **Relations**: 
  - Joins với Team qua UserTeamRole
  - Has nhiều Calendar

### **Todos (Công việc)**
- `id` - Primary Key
- `title` - Tiêu đề
- `description` - Mô tả
- `due_date` - Ngày hạn chót
- `is_completed` - Trạng thái hoàn thành

### **Teams (Nhóm)**
- `id` - Primary Key
- `name` - Tên nhóm
- **Relations**:
  - Joins với User qua UserTeamRole
  - Has nhiều Calendar

### **Calendars (Lịch)**
- `id` - Primary Key
- `user_id` - FK User
- `team_id` - FK Team
- Lưu trữ sự kiện lịch của người dùng/nhóm

### **Roles (Vai trò)**
- `id` - Primary Key
- `name` - Tên vai trò

### **UserTeamRole (Join Table)**
- `user_id` - FK User
- `team_id` - FK Team
- `role_id` - FK Role
- Liên kết người dùng với nhóm và vai trò của họ

---

## 🔌 API Endpoints

### todos
- `GET /api/todos` - Lấy tất cả công việc
- `POST /api/todos` - Tạo công việc mới
- `PUT /api/todos/:id` - Cập nhật công việc
- `DELETE /api/todos/:id` - Xóa công việc
- `PUT /api/checktodos/:id` - Đánh dấu hoàn thành

### Authentication
- `POST /api/register` - Đăng ký người dùng mới
- `POST /api/login` - Đăng nhập
- `POST /api/logout` - Đăng xuất

### Teams (🔐 Yêu cầu JWT)
- `POST /api/team` - Tạo nhóm mới
- `GET /api/getteams` - Lấy danh sách nhóm
- `GET /api/user-teams` - Lấy nhóm của người dùng hiện tại

### Calendars (🔐 Yêu cầu JWT)
- `POST /api/calendars` - Tạo sự kiện lịch
- `GET /api/getcalendars` - Lấy tất cả lịch
- `PUT /api/updatecalendar/:id` - Cập nhật lịch
- `DELETE /api/deletecalendar/:id` - Xóa lịch

---

## 🔐 Authentication

- **Phương thức**: JWT (JSON Web Token)
- **Lưu trữ**: Cookies (HttpOnly, Secure)
- **Thời hạn**: 7 ngày
- **Middleware**: `authMiddleware` (bắt buộc cho endpoints team/calendar)
- **Secret Key**: Từ biến môi trường `JWT_SECRET` hoặc mặc định "calander"

### Luồng Xác thực:
1. Người dùng đăng ký/đăng nhập
2. Server tạo JWT token
3. Token được gửi trong cookie (HttpOnly)
4. Frontend tự động gửi kèm request
5. Middleware xác thực token trước khi xử lý

---

## 🚀 Installation & Setup

### 1. Clone repository
```bash
cd Be-calander
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Tạo file `.env` ở root folder:
```bash
# Database
DB_USERNAME=levtest
DB_PASSWORD=Levcloud2025@@
DB_NAME=Lev_test_db
DB_HOST=104.161.49.14
DB_DIALECT=mysql
DB_PORT=28138

# JWT
JWT_SECRET=your_secret_key_here

# Environment
NODE_ENV=development
PORT=3001
```

### 4. Run database migrations
```bash
npm run migrate
```

### 5. Start development server
```bash
npm start
```

Server chạy tại: `http://localhost:3001`

---

## 🔧 Key Features

### Todo Management
- Tạo, cập nhật, xóa công việc
- Đánh dấu hoàn thành
- Thêm ngày hạn chót

### User Authentication
- Đăng ký với email
- Đăng nhập bằng email/password
- Password hashing với bcrypt
- JWT token 7 ngày

### Team Management
- Tạo nhóm
- Thêm người dùng vào nhóm
- Gán vai trò cho thành viên

### Calendar
- Quản lý sự kiện lịch người dùng
- Quản lý lịch nhóm
- Update/Delete sự kiện

---

## 🔄 Database Connection

Dự án hiện dùng **MySQL remote**:
- Host: `104.161.49.14`
- Port: `28138`
- Database: `Lev_test_db`

**Cảnh báo**: Credentials trong db.js là test, cần chuyển sang .env trước production.

---

## 📝 Development Notes

### CORS Settings
- Frontend được phép: `https://calander-inky.vercel.app` (production)
- Dev: `http://localhost:3000`
- Credentials: Enabled

### Sequelize Setup
- Auto-load models từ `/models` folder
- Chạy `associate()` tự động cho relationships
- Config từ `config/config.js`

### Redis (Chưa dùng tích cực)
- Package `ioredis` đã cài
- Có thể dùng cho caching/session store

---

## 🐛 Common Issues

| Vấn đề | Giải pháp |
|--------|----------|
| `Error: Cannot find module 'sequelize'` | Chạy `npm install` |
| Database connection error | Kiểm tra `.env` variables và kết nối mạng |
| JWT expired | Token hết hạn, user cần đăng nhập lại |
| CORS error | Kiểm tra frontend URL trong CORS config |

---

## 🔮 Frontend Integration

Frontend Next.js tại: `../calander/`
- Quản lý state: Context API
- Auth: Cookie/JWT
- API Base URL: `http://localhost:3001/api` (dev)

---

## 📚 File References

- **Entry Point**: [main.js](main.js)
- **Models**: [models/index.js](models/index.js)
- **Routes**: [routes/index.js](routes/index.js)
- **Auth**: [middlewares/auth.js](middlewares/auth.js)
- **Config**: [config/config.js](config/config.js)

---

## 👨‍💻 Quick Commands

```bash
# Start dev server
npm start

# Create migration
npx sequelize-cli migration:generate --name create-table-name

# Run migrations
npm run migrate

# Seed database
npx sequelize-cli db:seed:all
```

---

**Cập nhật**: April 8, 2026  
**Version**: 1.0.0
