/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/api.module.ts"
/*!************************************!*\
  !*** ./apps/api/src/api.module.ts ***!
  \************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const auth_module_1 = __webpack_require__(/*! ./modules/auth/auth.module */ "./apps/api/src/modules/auth/auth.module.ts");
const todos_module_1 = __webpack_require__(/*! ./modules/todos/todos.module */ "./apps/api/src/modules/todos/todos.module.ts");
const teams_module_1 = __webpack_require__(/*! ./modules/teams/teams.module */ "./apps/api/src/modules/teams/teams.module.ts");
const calendars_module_1 = __webpack_require__(/*! ./modules/calendars/calendars.module */ "./apps/api/src/modules/calendars/calendars.module.ts");
const upload_module_1 = __webpack_require__(/*! ./modules/upload/upload.module */ "./apps/api/src/modules/upload/upload.module.ts");
const lifecycle_test_module_1 = __webpack_require__(/*! ./modules/lifecycle-test/lifecycle-test.module */ "./apps/api/src/modules/lifecycle-test/lifecycle-test.module.ts");
const users_module_1 = __webpack_require__(/*! ./modules/users/users.module */ "./apps/api/src/modules/users/users.module.ts");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const path_1 = __webpack_require__(/*! path */ "path");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_2.DatabaseModule,
            auth_module_1.AuthModule,
            todos_module_1.TodosModule,
            teams_module_1.TeamsModule,
            calendars_module_1.CalendarsModule,
            upload_module_1.UploadModule,
            lifecycle_test_module_1.LifecycleTestModule,
            users_module_1.UsersModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(process.cwd(), 'uploads'),
                serveRoot: '/uploads',
                serveStaticOptions: {
                    fallthrough: false,
                },
            }),
        ],
    })
], ApiModule);


/***/ },

/***/ "./apps/api/src/main.ts"
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cookie_parser_1 = __importDefault(__webpack_require__(/*! cookie-parser */ "cookie-parser"));
const api_module_1 = __webpack_require__(/*! ./api.module */ "./apps/api/src/api.module.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_module_1.ApiModule);
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new common_2.GlobalExceptionFilter());
    app.enableCors({
        origin: [
            'http://localhost:4000',
            'https://calendar.qanh.site',
            'https://qanh.site'
        ],
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();


/***/ },

/***/ "./apps/api/src/modules/auth/auth.controller.ts"
/*!******************************************************!*\
  !*** ./apps/api/src/modules/auth/auth.controller.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/api/src/modules/auth/auth.service.ts");
const register_dto_1 = __webpack_require__(/*! ./dto/register.dto */ "./apps/api/src/modules/auth/dto/register.dto.ts");
const login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ "./apps/api/src/modules/auth/dto/login.dto.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async login(loginDto, res) {
        const result = await this.authService.login(loginDto);
        const customDomain = process.env.COOKIE_DOMAIN ||
            (process.env.NODE_ENV === 'production' ? '.qanh.site' : undefined);
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            ...(customDomain && { domain: customDomain }),
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return result;
    }
    getMe(req) {
        const user = req.user;
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    logout(res) {
        const customDomain = process.env.COOKIE_DOMAIN ||
            (process.env.NODE_ENV === 'production' ? '.qanh.site' : undefined);
        res.clearCookie('token', {
            path: '/',
            ...(customDomain && { domain: customDomain }),
        });
        return { message: 'Đăng xuất thành công' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./apps/api/src/modules/auth/auth.module.ts"
/*!**************************************************!*\
  !*** ./apps/api/src/modules/auth/auth.module.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/api/src/modules/auth/auth.controller.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/api/src/modules/auth/auth.service.ts");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv.config();
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'calander',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, common_2.JwtStrategy],
    })
], AuthModule);


/***/ },

/***/ "./apps/api/src/modules/auth/auth.service.ts"
/*!***************************************************!*\
  !*** ./apps/api/src/modules/auth/auth.service.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const argon2 = __importStar(__webpack_require__(/*! argon2 */ "argon2"));
let AuthService = class AuthService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingUser = await common_2.User.findOne({ where: { email: registerDto.email } });
        if (existingUser) {
            throw new common_1.BadRequestException('Email đã tồn tại');
        }
        const hashedPassword = await argon2.hash(registerDto.password);
        const user = await common_2.User.create({
            name: registerDto.fname,
            email: registerDto.email,
            password: hashedPassword,
            role: 'user',
            is_active: true,
        });
        return { message: 'Đăng ký thành công', user: { id: user.id, email: user.email, name: user.name } };
    }
    async login(loginDto) {
        const user = await common_2.User.findOne({
            where: { email: loginDto.email },
            raw: true
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const isPasswordValid = await argon2.verify(user.password, loginDto.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return { message: 'Đăng nhập thành công', token, user: { id: user.id, email: user.email, role: user.role } };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);


/***/ },

/***/ "./apps/api/src/modules/auth/dto/login.dto.ts"
/*!****************************************************!*\
  !*** ./apps/api/src/modules/auth/dto/login.dto.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ },

/***/ "./apps/api/src/modules/auth/dto/register.dto.ts"
/*!*******************************************************!*\
  !*** ./apps/api/src/modules/auth/dto/register.dto.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
    fname;
    email;
    password;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "fname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);


/***/ },

/***/ "./apps/api/src/modules/calendars/calendars.controller.ts"
/*!****************************************************************!*\
  !*** ./apps/api/src/modules/calendars/calendars.controller.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const calendars_service_1 = __webpack_require__(/*! ./calendars.service */ "./apps/api/src/modules/calendars/calendars.service.ts");
const calendar_dto_1 = __webpack_require__(/*! ./dto/calendar.dto */ "./apps/api/src/modules/calendars/dto/calendar.dto.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const update_calendar_dto_1 = __webpack_require__(/*! ./dto/update-calendar.dto */ "./apps/api/src/modules/calendars/dto/update-calendar.dto.ts");
let CalendarsController = class CalendarsController {
    calendarsService;
    constructor(calendarsService) {
        this.calendarsService = calendarsService;
    }
    findAllForAdmin() {
        return this.calendarsService.findAllForAdmin();
    }
    findAllForUser(req) {
        return this.calendarsService.findAllForUser(req.user.id);
    }
    create(req, calendarDto) {
        return this.calendarsService.createWithRules(req.user, calendarDto);
    }
    updateStatus(req, id, status, file_id) {
        return this.calendarsService.updateStatus(id, req.user, status, file_id);
    }
    update(req, id, calendarDto) {
        return this.calendarsService.update(id, req.user, calendarDto);
    }
    remove(id) {
        return this.calendarsService.remove(id);
    }
};
exports.CalendarsController = CalendarsController;
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN),
    (0, common_1.Get)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "findAllForAdmin", null);
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.USER),
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "findAllForUser", null);
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN, common_2.RoleEnum.USER),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof calendar_dto_1.CalendarDto !== "undefined" && calendar_dto_1.CalendarDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "create", null);
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN, common_2.RoleEnum.USER),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('status')),
    __param(3, (0, common_1.Body)('file_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, Number]),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "updateStatus", null);
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN, common_2.RoleEnum.USER),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, typeof (_c = typeof update_calendar_dto_1.UpdateCalendarDto !== "undefined" && update_calendar_dto_1.UpdateCalendarDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "update", null);
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN, common_2.RoleEnum.USER),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "remove", null);
exports.CalendarsController = CalendarsController = __decorate([
    (0, common_1.Controller)('calendars'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof calendars_service_1.CalendarsService !== "undefined" && calendars_service_1.CalendarsService) === "function" ? _a : Object])
], CalendarsController);


/***/ },

/***/ "./apps/api/src/modules/calendars/calendars.module.ts"
/*!************************************************************!*\
  !*** ./apps/api/src/modules/calendars/calendars.module.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const calendars_service_1 = __webpack_require__(/*! ./calendars.service */ "./apps/api/src/modules/calendars/calendars.service.ts");
const calendars_controller_1 = __webpack_require__(/*! ./calendars.controller */ "./apps/api/src/modules/calendars/calendars.controller.ts");
let CalendarsModule = class CalendarsModule {
};
exports.CalendarsModule = CalendarsModule;
exports.CalendarsModule = CalendarsModule = __decorate([
    (0, common_1.Module)({
        controllers: [calendars_controller_1.CalendarsController],
        providers: [calendars_service_1.CalendarsService],
    })
], CalendarsModule);


/***/ },

/***/ "./apps/api/src/modules/calendars/calendars.service.ts"
/*!*************************************************************!*\
  !*** ./apps/api/src/modules/calendars/calendars.service.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
let CalendarsService = class CalendarsService {
    updateFields = [
        'name',
        'type',
        'start_time',
        'end_time',
        'status',
        'file_id',
    ];
    adminOnlyFields = ['team_id', 'assigner_id'];
    toPlainCalendar(calendar) {
        return calendar.get({ plain: true });
    }
    async findAllForAdmin() {
        return common_2.Calendar.findAll({ include: [{ model: common_2.FileModel }] });
    }
    async findAllForUser(userId) {
        const userTeams = await common_2.UserTeamRole.findAll({
            where: { user_id: userId },
            raw: true,
            attributes: ['team_id'],
        });
        const teamIds = userTeams.map((ut) => ut.team_id);
        return common_2.Calendar.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { user_id: userId },
                    { assigner_id: userId },
                    { assigner_id: null, team_id: { [sequelize_1.Op.in]: teamIds } },
                ],
            },
            include: [{ model: common_2.FileModel }],
            raw: true,
            nest: true,
        });
    }
    async createWithRules(user, calendarDto) {
        const payload = { ...calendarDto };
        if (user.role === 'admin') {
            if (!payload.user_id)
                payload.user_id = user.id;
        }
        else {
            payload.user_id = user.id;
            payload.assigner_id = null;
            payload.team_id = null;
        }
        payload.status = 'pending';
        const calendar = await common_2.Calendar.create(payload);
        return {
            message: 'Tạo lịch thành công',
            calendar: this.toPlainCalendar(calendar),
        };
    }
    isAdmin(user) {
        return user.role === 'admin';
    }
    isAssigner(user, calendar) {
        return Number(calendar.assigner_id) === user.id;
    }
    async isTeamMember(user, calendar) {
        if (!calendar.team_id)
            return false;
        const membership = await common_2.UserTeamRole.findOne({
            where: {
                user_id: user.id,
                team_id: calendar.team_id,
            },
            attributes: ['id'],
        });
        return Boolean(membership);
    }
    async canUpdateCalendar(user, calendar) {
        if (this.isAdmin(user))
            return true;
        if (this.isAssigner(user, calendar))
            return true;
        if (calendar.assigner_id === null)
            return this.isTeamMember(user, calendar);
        return false;
    }
    async assertCanUpdateCalendar(user, calendar) {
        const canUpdate = await this.canUpdateCalendar(user, calendar);
        if (!canUpdate) {
            throw new common_1.ForbiddenException('Bạn không có quyền cập nhật lịch này');
        }
    }
    assertAdminOnlyFields(user, calendar, dto) {
        if (this.isAdmin(user))
            return;
        for (const field of this.adminOnlyFields) {
            if (dto[field] === undefined)
                continue;
            const incomingValue = dto[field] ?? null;
            const currentValue = calendar[field] ?? null;
            if (incomingValue !== currentValue) {
                throw new common_1.ForbiddenException(`Bạn không có quyền cập nhật ${field}`);
            }
        }
    }
    normalizeUpdatePayload(user, dto) {
        const payload = this.updateFields.reduce((result, field) => {
            return {
                ...result,
                [field]: dto[field] ?? null,
            };
        }, {});
        if (this.isAdmin(user)) {
            payload.team_id = dto.team_id ?? null;
            payload.assigner_id = dto.assigner_id ?? null;
        }
        return payload;
    }
    async updateStatus(id, user, status, file_id) {
        const calendarInstance = await common_2.Calendar.findByPk(id);
        if (!calendarInstance)
            throw new common_1.NotFoundException('Lịch không tồn tại');
        await this.assertCanUpdateCalendar(user, calendarInstance);
        if (!['completed', 'pending'].includes(status)) {
            throw new common_1.BadRequestException('Trạng thái không hợp lệ');
        }
        const payload = status === 'completed'
            ? { status: 'completed', file_id: file_id ?? null }
            : { status: 'pending', file_id: null };
        await calendarInstance.update(payload);
        return {
            message: 'Cập nhật trạng thái thành công',
            calendar: this.toPlainCalendar(calendarInstance),
        };
    }
    async update(id, user, calendarDto) {
        const calendarInstance = await common_2.Calendar.findByPk(id);
        if (!calendarInstance)
            throw new common_1.NotFoundException('Lịch không tồn tại');
        const calendar = calendarInstance.get({ plain: true });
        await this.assertCanUpdateCalendar(user, calendar);
        this.assertAdminOnlyFields(user, calendar, calendarDto);
        const payload = this.normalizeUpdatePayload(user, calendarDto);
        await common_2.Calendar.update(payload, { where: { id } });
        return {
            message: 'Cập nhật thành công',
            calendar: calendar,
        };
    }
    async remove(id) {
        const calendar = await common_2.Calendar.findByPk(id);
        if (!calendar)
            throw new common_1.NotFoundException('Lịch không tồn tại');
        await calendar.destroy();
        return { message: 'Xóa thành công' };
    }
};
exports.CalendarsService = CalendarsService;
exports.CalendarsService = CalendarsService = __decorate([
    (0, common_1.Injectable)()
], CalendarsService);


/***/ },

/***/ "./apps/api/src/modules/calendars/dto/calendar.dto.ts"
/*!************************************************************!*\
  !*** ./apps/api/src/modules/calendars/dto/calendar.dto.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CalendarDto {
    name;
    type;
    start_time;
    end_time;
    team_id;
    assigner_id;
}
exports.CalendarDto = CalendarDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalendarDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalendarDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CalendarDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CalendarDto.prototype, "end_time", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CalendarDto.prototype, "team_id", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CalendarDto.prototype, "assigner_id", void 0);


/***/ },

/***/ "./apps/api/src/modules/calendars/dto/update-calendar.dto.ts"
/*!*******************************************************************!*\
  !*** ./apps/api/src/modules/calendars/dto/update-calendar.dto.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCalendarDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateCalendarDto {
    name;
    type;
    start_time;
    end_time;
    status;
    team_id;
    assigner_id;
    file_id;
}
exports.UpdateCalendarDto = UpdateCalendarDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "start_time", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "end_time", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "team_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "assigner_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateCalendarDto.prototype, "file_id", void 0);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/dto/lifecycle-test.dto.ts"
/*!***********************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/dto/lifecycle-test.dto.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LifecycleTestDto {
    name;
    email;
    age;
}
exports.LifecycleTestDto = LifecycleTestDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LifecycleTestDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LifecycleTestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(18),
    __metadata("design:type", Number)
], LifecycleTestDto.prototype, "age", void 0);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/filters/lifecycle-test.filter.ts"
/*!******************************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/filters/lifecycle-test.filter.ts ***!
  \******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LifecycleTestFilter = class LifecycleTestFilter {
    logger = new common_1.Logger('LifecycleFilter');
    catch(exception, host) {
        this.logger.error('[EXCEPTION FILTER] Catching exception', exception instanceof Error ? exception.stack : exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = 500;
        let message = 'Internal server error';
        let errorResponse = null;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            errorResponse = exception.getResponse();
            if (typeof errorResponse === 'object' && errorResponse !== null) {
                message = errorResponse.message || exception.message;
            }
            else {
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
};
exports.LifecycleTestFilter = LifecycleTestFilter;
exports.LifecycleTestFilter = LifecycleTestFilter = __decorate([
    (0, common_1.Catch)()
], LifecycleTestFilter);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/guards/lifecycle-test.guard.ts"
/*!****************************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/guards/lifecycle-test.guard.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LifecycleTestGuard = class LifecycleTestGuard {
    logger = new common_1.Logger('LifecycleGuard');
    canActivate(context) {
        this.logger.log('[GUARD] Checking x-api-key');
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        if (apiKey !== 'test-api-key') {
            this.logger.warn(`[GUARD] Invalid or missing API key: ${apiKey}`);
            throw new common_1.UnauthorizedException('Invalid API Key');
        }
        this.logger.log('[GUARD] Access granted');
        return true;
    }
};
exports.LifecycleTestGuard = LifecycleTestGuard;
exports.LifecycleTestGuard = LifecycleTestGuard = __decorate([
    (0, common_1.Injectable)()
], LifecycleTestGuard);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/interceptors/lifecycle-test.interceptor.ts"
/*!****************************************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/interceptors/lifecycle-test.interceptor.ts ***!
  \****************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
let LifecycleTestInterceptor = class LifecycleTestInterceptor {
    logger = new common_1.Logger('LifecycleInterceptor');
    intercept(context, next) {
        this.logger.log('[INTERCEPTOR BEFORE] Before controller execution');
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => this.logger.log(`[INTERCEPTOR AFTER] After controller execution`)), (0, operators_1.map)(data => {
            const executionTime = `${Date.now() - now}ms`;
            return {
                success: true,
                message: 'Lifecycle executed successfully',
                data,
                meta: {
                    requestId: req.requestId,
                    executionTime,
                }
            };
        }));
    }
};
exports.LifecycleTestInterceptor = LifecycleTestInterceptor;
exports.LifecycleTestInterceptor = LifecycleTestInterceptor = __decorate([
    (0, common_1.Injectable)()
], LifecycleTestInterceptor);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/lifecycle-test.controller.ts"
/*!**************************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/lifecycle-test.controller.ts ***!
  \**************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const lifecycle_test_service_1 = __webpack_require__(/*! ./lifecycle-test.service */ "./apps/api/src/modules/lifecycle-test/lifecycle-test.service.ts");
const lifecycle_test_dto_1 = __webpack_require__(/*! ./dto/lifecycle-test.dto */ "./apps/api/src/modules/lifecycle-test/dto/lifecycle-test.dto.ts");
const lifecycle_test_guard_1 = __webpack_require__(/*! ./guards/lifecycle-test.guard */ "./apps/api/src/modules/lifecycle-test/guards/lifecycle-test.guard.ts");
const lifecycle_test_interceptor_1 = __webpack_require__(/*! ./interceptors/lifecycle-test.interceptor */ "./apps/api/src/modules/lifecycle-test/interceptors/lifecycle-test.interceptor.ts");
const uppercase_pipe_1 = __webpack_require__(/*! ./pipes/uppercase.pipe */ "./apps/api/src/modules/lifecycle-test/pipes/uppercase.pipe.ts");
const lifecycle_test_filter_1 = __webpack_require__(/*! ./filters/lifecycle-test.filter */ "./apps/api/src/modules/lifecycle-test/filters/lifecycle-test.filter.ts");
let LifecycleTestController = class LifecycleTestController {
    lifecycleTestService;
    logger = new common_1.Logger('LifecycleController');
    constructor(lifecycleTestService) {
        this.lifecycleTestService = lifecycleTestService;
    }
    async createTest(body) {
        this.logger.log('[CONTROLLER] Handling POST /lifecycle-test request');
        return this.lifecycleTestService.processRequest(body);
    }
};
exports.LifecycleTestController = LifecycleTestController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true }), uppercase_pipe_1.UppercasePipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof lifecycle_test_dto_1.LifecycleTestDto !== "undefined" && lifecycle_test_dto_1.LifecycleTestDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], LifecycleTestController.prototype, "createTest", null);
exports.LifecycleTestController = LifecycleTestController = __decorate([
    (0, common_1.Controller)('lifecycle-test'),
    (0, common_1.UseGuards)(lifecycle_test_guard_1.LifecycleTestGuard),
    (0, common_1.UseInterceptors)(lifecycle_test_interceptor_1.LifecycleTestInterceptor),
    (0, common_1.UseFilters)(lifecycle_test_filter_1.LifecycleTestFilter),
    __metadata("design:paramtypes", [typeof (_a = typeof lifecycle_test_service_1.LifecycleTestService !== "undefined" && lifecycle_test_service_1.LifecycleTestService) === "function" ? _a : Object])
], LifecycleTestController);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/lifecycle-test.module.ts"
/*!**********************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/lifecycle-test.module.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const lifecycle_test_controller_1 = __webpack_require__(/*! ./lifecycle-test.controller */ "./apps/api/src/modules/lifecycle-test/lifecycle-test.controller.ts");
const lifecycle_test_service_1 = __webpack_require__(/*! ./lifecycle-test.service */ "./apps/api/src/modules/lifecycle-test/lifecycle-test.service.ts");
const lifecycle_test_middleware_1 = __webpack_require__(/*! ./middleware/lifecycle-test.middleware */ "./apps/api/src/modules/lifecycle-test/middleware/lifecycle-test.middleware.ts");
let LifecycleTestModule = class LifecycleTestModule {
    configure(consumer) {
        consumer.apply(lifecycle_test_middleware_1.LifecycleTestMiddleware).forRoutes(lifecycle_test_controller_1.LifecycleTestController);
    }
};
exports.LifecycleTestModule = LifecycleTestModule;
exports.LifecycleTestModule = LifecycleTestModule = __decorate([
    (0, common_1.Module)({
        controllers: [lifecycle_test_controller_1.LifecycleTestController],
        providers: [lifecycle_test_service_1.LifecycleTestService],
    })
], LifecycleTestModule);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/lifecycle-test.service.ts"
/*!***********************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/lifecycle-test.service.ts ***!
  \***********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LifecycleTestService = class LifecycleTestService {
    logger = new common_1.Logger('LifecycleService');
    onModuleInit() {
        this.logger.log('[HOOK] Module initialized (OnModuleInit)');
    }
    onApplicationBootstrap() {
        this.logger.log('[HOOK] App bootstrap completed (OnApplicationBootstrap)');
    }
    onModuleDestroy() {
        this.logger.log('[HOOK] Module destruction started (OnModuleDestroy)');
    }
    beforeApplicationShutdown(signal) {
        this.logger.log(`[HOOK] Before application shutdown (BeforeApplicationShutdown) - signal: ${signal}`);
    }
    onApplicationShutdown(signal) {
        this.logger.log(`[HOOK] Application shutdown (OnApplicationShutdown) - signal: ${signal}`);
    }
    async processRequest(data) {
        this.logger.log('[SERVICE] Processing request...');
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.logger.log('[SERVICE] Request processed successfully.');
        return {
            ...data,
            createdAt: new Date().toISOString(),
        };
    }
};
exports.LifecycleTestService = LifecycleTestService;
exports.LifecycleTestService = LifecycleTestService = __decorate([
    (0, common_1.Injectable)()
], LifecycleTestService);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/middleware/lifecycle-test.middleware.ts"
/*!*************************************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/middleware/lifecycle-test.middleware.ts ***!
  \*************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LifecycleTestMiddleware = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let LifecycleTestMiddleware = class LifecycleTestMiddleware {
    logger = new common_1.Logger('LifecycleMiddleware');
    use(req, res, next) {
        const requestId = Math.random().toString(36).substring(2, 8);
        req['requestId'] = requestId;
        req['timestamp'] = Date.now();
        this.logger.log(`[MIDDLEWARE] ${req.method} ${req.originalUrl} requestId=${requestId}`);
        next();
    }
};
exports.LifecycleTestMiddleware = LifecycleTestMiddleware;
exports.LifecycleTestMiddleware = LifecycleTestMiddleware = __decorate([
    (0, common_1.Injectable)()
], LifecycleTestMiddleware);


/***/ },

/***/ "./apps/api/src/modules/lifecycle-test/pipes/uppercase.pipe.ts"
/*!*********************************************************************!*\
  !*** ./apps/api/src/modules/lifecycle-test/pipes/uppercase.pipe.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UppercasePipe = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let UppercasePipe = class UppercasePipe {
    logger = new common_1.Logger('LifecyclePipe');
    transform(value, metadata) {
        this.logger.log(`[PIPE] Transforming ${metadata.type}`);
        if (metadata.type === 'body' && value && typeof value.name === 'string') {
            value.name = value.name.toUpperCase();
            this.logger.log(`[PIPE] Name transformed to uppercase: ${value.name}`);
        }
        return value;
    }
};
exports.UppercasePipe = UppercasePipe;
exports.UppercasePipe = UppercasePipe = __decorate([
    (0, common_1.Injectable)()
], UppercasePipe);


/***/ },

/***/ "./apps/api/src/modules/teams/dto/add-team-member.dto.ts"
/*!***************************************************************!*\
  !*** ./apps/api/src/modules/teams/dto/add-team-member.dto.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddTeamMemberDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class AddTeamMemberDto {
    email;
}
exports.AddTeamMemberDto = AddTeamMemberDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AddTeamMemberDto.prototype, "email", void 0);


/***/ },

/***/ "./apps/api/src/modules/teams/dto/create-team.dto.ts"
/*!***********************************************************!*\
  !*** ./apps/api/src/modules/teams/dto/create-team.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTeamDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateTeamDto {
    name;
    members;
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateTeamDto.prototype, "members", void 0);


/***/ },

/***/ "./apps/api/src/modules/teams/dto/team-member-param.dto.ts"
/*!*****************************************************************!*\
  !*** ./apps/api/src/modules/teams/dto/team-member-param.dto.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamMemberParamDto = void 0;
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class TeamMemberParamDto {
    teamId;
    userId;
}
exports.TeamMemberParamDto = TeamMemberParamDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TeamMemberParamDto.prototype, "teamId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TeamMemberParamDto.prototype, "userId", void 0);


/***/ },

/***/ "./apps/api/src/modules/teams/teams.controller.ts"
/*!********************************************************!*\
  !*** ./apps/api/src/modules/teams/teams.controller.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const teams_service_1 = __webpack_require__(/*! ./teams.service */ "./apps/api/src/modules/teams/teams.service.ts");
const create_team_dto_1 = __webpack_require__(/*! ./dto/create-team.dto */ "./apps/api/src/modules/teams/dto/create-team.dto.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const get_user_decorator_1 = __webpack_require__(/*! @app/common/decorator/get-user.decorator */ "./libs/common/src/decorator/get-user.decorator.ts");
const add_team_member_dto_1 = __webpack_require__(/*! ./dto/add-team-member.dto */ "./apps/api/src/modules/teams/dto/add-team-member.dto.ts");
const team_member_param_dto_1 = __webpack_require__(/*! ./dto/team-member-param.dto */ "./apps/api/src/modules/teams/dto/team-member-param.dto.ts");
let TeamsController = class TeamsController {
    teamsService;
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    create(req, createTeamDto) {
        return this.teamsService.create(req.user.id, createTeamDto);
    }
    findAll(req) {
        return this.teamsService.findUserTeams(req.user.id);
    }
    findUserTeams(user) {
        return this.teamsService.findUserTeams(user.id);
    }
    addMember(user, teamId, addTeamMemberDto) {
        return this.teamsService.addMember(user.id, Number(teamId), addTeamMemberDto.email);
    }
    removeMember(user, params) {
        return this.teamsService.removeMember(user.id, params.teamId, params.userId);
    }
    demoteMember(user, params) {
        return this.teamsService.demoteMember(user.id, params.teamId, params.userId);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_team_dto_1.CreateTeamDto !== "undefined" && create_team_dto_1.CreateTeamDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getteams'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user-teams'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "findUserTeams", null);
__decorate([
    (0, common_1.Post)(':teamId/members'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('teamId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_c = typeof add_team_member_dto_1.AddTeamMemberDto !== "undefined" && add_team_member_dto_1.AddTeamMemberDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':teamId/members/:userId'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof team_member_param_dto_1.TeamMemberParamDto !== "undefined" && team_member_param_dto_1.TeamMemberParamDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Patch)(':teamId/members/:userId/demote'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_e = typeof team_member_param_dto_1.TeamMemberParamDto !== "undefined" && team_member_param_dto_1.TeamMemberParamDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], TeamsController.prototype, "demoteMember", null);
exports.TeamsController = TeamsController = __decorate([
    (0, common_1.Controller)('team'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof teams_service_1.TeamsService !== "undefined" && teams_service_1.TeamsService) === "function" ? _a : Object])
], TeamsController);


/***/ },

/***/ "./apps/api/src/modules/teams/teams.module.ts"
/*!****************************************************!*\
  !*** ./apps/api/src/modules/teams/teams.module.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const teams_service_1 = __webpack_require__(/*! ./teams.service */ "./apps/api/src/modules/teams/teams.service.ts");
const teams_controller_1 = __webpack_require__(/*! ./teams.controller */ "./apps/api/src/modules/teams/teams.controller.ts");
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teams_controller_1.TeamsController],
        providers: [teams_service_1.TeamsService],
    })
], TeamsModule);


/***/ },

/***/ "./apps/api/src/modules/teams/teams.service.ts"
/*!*****************************************************!*\
  !*** ./apps/api/src/modules/teams/teams.service.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const sequelize_1 = __webpack_require__(/*! sequelize */ "sequelize");
let TeamsService = class TeamsService {
    adminRoleName = 'Admin';
    memberRoleName = 'Member';
    async ensureTeamRoles() {
        const [adminRole] = await common_2.Role.findOrCreate({
            where: { id: 1 },
            defaults: { name: this.adminRoleName },
        });
        const [memberRole] = await common_2.Role.findOrCreate({
            where: { id: 2 },
            defaults: { name: this.memberRoleName },
        });
        return { adminRole, memberRole };
    }
    async ensureTeamAdmin(userId, teamId) {
        const membershipInstance = await common_2.UserTeamRole.findOne({
            where: { user_id: userId, team_id: teamId },
            include: [{ model: common_2.Role, attributes: ['id', 'name'] }],
        });
        if (!membershipInstance) {
            throw new common_1.ForbiddenException('Bạn không thuộc team này');
        }
        const membership = membershipInstance.get({ plain: true });
        if (membership.role?.name !== this.adminRoleName) {
            throw new common_1.ForbiddenException('Bạn không có quyền quản lý team này');
        }
        return membership;
    }
    hasPlainGetter(team) {
        return (typeof team === 'object' &&
            team !== null &&
            'get' in team &&
            typeof team.get === 'function');
    }
    formatTeam(team) {
        const cleanTeam = (this.hasPlainGetter(team) ? team.get({ plain: true }) : team);
        const rolesByUserId = new Map();
        (cleanTeam.userTeamRoles ?? []).forEach((item) => {
            if (item.user_id && item.role) {
                rolesByUserId.set(item.user_id, item.role);
            }
        });
        const users = (cleanTeam.users ?? []).map((user) => {
            const role = rolesByUserId.get(user.id);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                roleId: role?.id,
                roleName: role?.name,
            };
        });
        return {
            id: Number(cleanTeam.id),
            name: cleanTeam.name,
            users,
            memberCount: users.length,
        };
    }
    async findTeamById(teamId) {
        const team = await common_2.Team.findByPk(teamId, {
            include: [
                {
                    model: common_2.User,
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                },
                {
                    model: common_2.UserTeamRole,
                    attributes: ['user_id', 'role_id'],
                    include: [{ model: common_2.Role, attributes: ['id', 'name'] }],
                },
            ],
        });
        if (!team) {
            throw new common_1.NotFoundException('Team not found');
        }
        return team;
    }
    async create(userId, createTeamDto) {
        const { name, members } = createTeamDto;
        const { adminRole, memberRole } = await this.ensureTeamRoles();
        const team = await common_2.Team.create({ name });
        let memberIds = [];
        if (members && members.length > 0) {
            const foundUsers = await common_2.User.findAll({
                where: {
                    email: {
                        [sequelize_1.Op.in]: members,
                    },
                },
                attributes: ['id'],
            });
            memberIds = Array.from(new Set(foundUsers.map((user) => Number(user.id)))).filter((id) => id !== userId);
        }
        const bulkData = [
            {
                user_id: userId,
                team_id: Number(team.id),
                role_id: Number(adminRole.id),
            },
            ...memberIds.map((id) => ({
                user_id: id,
                team_id: Number(team.id),
                role_id: Number(memberRole.id),
            })),
        ];
        await common_2.UserTeamRole.bulkCreate(bulkData);
        const createdTeam = await this.findTeamById(Number(team.id));
        return {
            message: 'Tạo nhóm thành công',
            team: this.formatTeam(createdTeam),
        };
    }
    async findUserTeams(userId) {
        const user = await common_2.User.findByPk(userId, {
            include: [
                {
                    model: common_2.Team,
                    through: { attributes: ['role_id'] },
                    include: [
                        {
                            model: common_2.User,
                            attributes: ['id', 'name', 'email'],
                            through: { attributes: [] },
                        },
                        {
                            model: common_2.UserTeamRole,
                            attributes: ['user_id', 'role_id'],
                            include: [{ model: common_2.Role, attributes: ['id', 'name'] }],
                        },
                    ],
                },
            ],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const cleanUser = user.get({ plain: true });
        return (cleanUser.teams ?? []).map((team) => this.formatTeam(team));
    }
    async addMember(requestUserId, teamId, email) {
        const { memberRole } = await this.ensureTeamRoles();
        await this.ensureTeamAdmin(requestUserId, teamId);
        const user = await common_2.User.findOne({ where: { email }, attributes: ['id'] });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy user với email này');
        }
        const existingMembership = await common_2.UserTeamRole.findOne({
            where: { user_id: user.id, team_id: teamId },
        });
        if (existingMembership) {
            throw new common_1.BadRequestException('User đã là thành viên của team');
        }
        await common_2.UserTeamRole.create({
            user_id: user.id,
            team_id: teamId,
            role_id: Number(memberRole.id),
        });
        const team = await this.findTeamById(teamId);
        return {
            message: 'Thêm thành viên thành công',
            team: this.formatTeam(team),
        };
    }
    async removeMember(requestUserId, teamId, userId) {
        await this.ensureTeamAdmin(requestUserId, teamId);
        const membership = await common_2.UserTeamRole.findOne({
            where: { user_id: userId, team_id: teamId },
            include: [{ model: common_2.Role, attributes: ['id', 'name'] }],
        });
        if (!membership) {
            throw new common_1.NotFoundException('Thành viên không tồn tại trong team');
        }
        if (membership.role?.name === this.adminRoleName) {
            const adminCount = await common_2.UserTeamRole.count({
                where: { team_id: teamId, role_id: membership.role_id },
            });
            if (adminCount <= 1) {
                throw new common_1.BadRequestException('Team phải còn ít nhất một admin');
            }
        }
        await membership.destroy();
        const team = await this.findTeamById(teamId);
        return {
            message: 'Xóa thành viên thành công',
            team: this.formatTeam(team),
        };
    }
    async demoteMember(requestUserId, teamId, userId) {
        const { memberRole } = await this.ensureTeamRoles();
        await this.ensureTeamAdmin(requestUserId, teamId);
        const membership = await common_2.UserTeamRole.findOne({
            where: { user_id: userId, team_id: teamId },
            include: [{ model: common_2.Role, attributes: ['id', 'name'] }],
        });
        if (!membership) {
            throw new common_1.NotFoundException('Thành viên không tồn tại trong team');
        }
        if (membership.role_id === memberRole.id) {
            throw new common_1.BadRequestException('Thành viên đã là Member');
        }
        if (membership.role?.name === this.adminRoleName) {
            const adminCount = await common_2.UserTeamRole.count({
                where: { team_id: teamId, role_id: membership.role_id },
            });
            if (adminCount <= 1) {
                throw new common_1.BadRequestException('Team phải còn ít nhất một admin');
            }
        }
        await membership.update({ role_id: Number(memberRole.id) });
        const team = await this.findTeamById(teamId);
        return {
            message: 'Hạ quyền thành viên thành công',
            team: this.formatTeam(team),
        };
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)()
], TeamsService);


/***/ },

/***/ "./apps/api/src/modules/todos/dto/create-todo.dto.ts"
/*!***********************************************************!*\
  !*** ./apps/api/src/modules/todos/dto/create-todo.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTodoDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateTodoDto {
    title;
    description;
    due_date;
}
exports.CreateTodoDto = CreateTodoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateTodoDto.prototype, "due_date", void 0);


/***/ },

/***/ "./apps/api/src/modules/todos/dto/update-todo.dto.ts"
/*!***********************************************************!*\
  !*** ./apps/api/src/modules/todos/dto/update-todo.dto.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTodoDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateTodoDto {
    title;
    description;
    due_date;
}
exports.UpdateTodoDto = UpdateTodoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTodoDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateTodoDto.prototype, "due_date", void 0);


/***/ },

/***/ "./apps/api/src/modules/todos/todos.controller.ts"
/*!********************************************************!*\
  !*** ./apps/api/src/modules/todos/todos.controller.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckTodosController = exports.TodosController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const todos_service_1 = __webpack_require__(/*! ./todos.service */ "./apps/api/src/modules/todos/todos.service.ts");
const create_todo_dto_1 = __webpack_require__(/*! ./dto/create-todo.dto */ "./apps/api/src/modules/todos/dto/create-todo.dto.ts");
const update_todo_dto_1 = __webpack_require__(/*! ./dto/update-todo.dto */ "./apps/api/src/modules/todos/dto/update-todo.dto.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let TodosController = class TodosController {
    todosService;
    constructor(todosService) {
        this.todosService = todosService;
    }
    findAll() {
        return this.todosService.findAll();
    }
    create(createTodoDto) {
        return this.todosService.create(createTodoDto);
    }
    update(id, updateTodoDto) {
        return this.todosService.update(id, updateTodoDto);
    }
    remove(id) {
        return this.todosService.remove(id);
    }
};
exports.TodosController = TodosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_todo_dto_1.CreateTodoDto !== "undefined" && create_todo_dto_1.CreateTodoDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof update_todo_dto_1.UpdateTodoDto !== "undefined" && update_todo_dto_1.UpdateTodoDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodosController.prototype, "remove", null);
exports.TodosController = TodosController = __decorate([
    (0, common_1.Controller)('todos'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof todos_service_1.TodosService !== "undefined" && todos_service_1.TodosService) === "function" ? _a : Object])
], TodosController);
let CheckTodosController = class CheckTodosController {
    todosService;
    constructor(todosService) {
        this.todosService = todosService;
    }
    checkTodo(id) {
        return this.todosService.checkTodo(id);
    }
};
exports.CheckTodosController = CheckTodosController;
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CheckTodosController.prototype, "checkTodo", null);
exports.CheckTodosController = CheckTodosController = __decorate([
    (0, common_1.Controller)('api/checktodos'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_d = typeof todos_service_1.TodosService !== "undefined" && todos_service_1.TodosService) === "function" ? _d : Object])
], CheckTodosController);


/***/ },

/***/ "./apps/api/src/modules/todos/todos.module.ts"
/*!****************************************************!*\
  !*** ./apps/api/src/modules/todos/todos.module.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const todos_service_1 = __webpack_require__(/*! ./todos.service */ "./apps/api/src/modules/todos/todos.service.ts");
const todos_controller_1 = __webpack_require__(/*! ./todos.controller */ "./apps/api/src/modules/todos/todos.controller.ts");
let TodosModule = class TodosModule {
};
exports.TodosModule = TodosModule;
exports.TodosModule = TodosModule = __decorate([
    (0, common_1.Module)({
        controllers: [todos_controller_1.TodosController, todos_controller_1.CheckTodosController],
        providers: [todos_service_1.TodosService],
    })
], TodosModule);


/***/ },

/***/ "./apps/api/src/modules/todos/todos.service.ts"
/*!*****************************************************!*\
  !*** ./apps/api/src/modules/todos/todos.service.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let TodosService = class TodosService {
    async findAll() {
        return common_2.Todo.findAll();
    }
    async create(createTodoDto) {
        const todo = await common_2.Todo.create({
            ...createTodoDto,
            is_completed: false,
        });
        return { message: 'Tạo công việc thành công', todo };
    }
    async update(id, updateTodoDto) {
        const todo = await common_2.Todo.findByPk(id);
        if (!todo)
            throw new common_1.NotFoundException('Không tìm thấy công việc');
        await todo.update(updateTodoDto);
        return { message: 'Cập nhật thành công', todo };
    }
    async remove(id) {
        const todo = await common_2.Todo.findByPk(id);
        if (!todo)
            throw new common_1.NotFoundException('Không tìm thấy công việc');
        await todo.destroy();
        return { message: 'Xóa thành công' };
    }
    async checkTodo(id) {
        const todo = await common_2.Todo.findByPk(id);
        if (!todo)
            throw new common_1.NotFoundException('Không tìm thấy công việc');
        await todo.update({ is_completed: true });
        return { message: 'Đánh dấu hoàn thành thành công', todo };
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);


/***/ },

/***/ "./apps/api/src/modules/upload/upload.controller.ts"
/*!**********************************************************!*\
  !*** ./apps/api/src/modules/upload/upload.controller.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let UploadController = class UploadController {
    async uploadFile(file) {
        if (!file)
            return { error: 'No file uploaded' };
        const fileUrl = `/uploads/${file.filename}`;
        const dbFile = await common_2.FileModel.create({
            file_name: file.originalname,
            file_path: fileUrl,
        });
        return {
            file_id: dbFile.id,
            file_path: fileUrl,
            file_url: fileUrl
        };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Chỉ được phép tải lên file ảnh!'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
exports.UploadController = UploadController = __decorate([
    (0, common_1.Controller)('upload'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard)
], UploadController);


/***/ },

/***/ "./apps/api/src/modules/upload/upload.module.ts"
/*!******************************************************!*\
  !*** ./apps/api/src/modules/upload/upload.module.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const upload_controller_1 = __webpack_require__(/*! ./upload.controller */ "./apps/api/src/modules/upload/upload.controller.ts");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './uploads',
            })
        ],
        controllers: [upload_controller_1.UploadController],
    })
], UploadModule);


/***/ },

/***/ "./apps/api/src/modules/users/dto/create-admin.dto.ts"
/*!************************************************************!*\
  !*** ./apps/api/src/modules/users/dto/create-admin.dto.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAdminDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateAdminDto {
    email;
    password;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);


/***/ },

/***/ "./apps/api/src/modules/users/users.controller.ts"
/*!********************************************************!*\
  !*** ./apps/api/src/modules/users/users.controller.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/api/src/modules/users/users.service.ts");
const create_admin_dto_1 = __webpack_require__(/*! ./dto/create-admin.dto */ "./apps/api/src/modules/users/dto/create-admin.dto.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createAdmin(createAdminDto, req) {
        return this.usersService.createAdmin(createAdminDto, req.user.id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('create-admin'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    (0, common_2.Roles)('admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_admin_dto_1.CreateAdminDto !== "undefined" && create_admin_dto_1.CreateAdminDto) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAdmin", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ },

/***/ "./apps/api/src/modules/users/users.module.ts"
/*!****************************************************!*\
  !*** ./apps/api/src/modules/users/users.module.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const users_controller_1 = __webpack_require__(/*! ./users.controller */ "./apps/api/src/modules/users/users.controller.ts");
const users_service_1 = __webpack_require__(/*! ./users.service */ "./apps/api/src/modules/users/users.service.ts");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
    })
], UsersModule);


/***/ },

/***/ "./apps/api/src/modules/users/users.service.ts"
/*!*****************************************************!*\
  !*** ./apps/api/src/modules/users/users.service.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var UsersService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
const argon2 = __importStar(__webpack_require__(/*! argon2 */ "argon2"));
let UsersService = UsersService_1 = class UsersService {
    logger = new common_1.Logger(UsersService_1.name);
    async createAdmin(createAdminDto, creatorId) {
        const existingUser = await common_2.User.findOne({
            where: { email: createAdminDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email đã tồn tại');
        }
        const hashedPassword = await argon2.hash(createAdminDto.password);
        const newAdmin = await common_2.User.create({
            email: createAdminDto.email,
            password: hashedPassword,
            name: createAdminDto.email.split('@')[0],
            role: 'admin',
            is_active: true,
        });
        this.logger.log(`Admin #${creatorId} đã tạo tài khoản admin mới #${newAdmin.id} (${createAdminDto.email})`);
        return {
            message: 'Tạo tài khoản admin thành công',
            user: {
                id: newAdmin.id,
                email: newAdmin.email,
                role: newAdmin.role,
            },
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)()
], UsersService);


/***/ },

/***/ "./libs/common/src/common.module.ts"
/*!******************************************!*\
  !*** ./libs/common/src/common.module.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_service_1 = __webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts");
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [common_service_1.CommonService],
        exports: [common_service_1.CommonService],
    })
], CommonModule);


/***/ },

/***/ "./libs/common/src/common.service.ts"
/*!*******************************************!*\
  !*** ./libs/common/src/common.service.ts ***!
  \*******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ },

/***/ "./libs/common/src/database/database.module.ts"
/*!*****************************************************!*\
  !*** ./libs/common/src/database/database.module.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sequelize_1 = __webpack_require__(/*! @nestjs/sequelize */ "@nestjs/sequelize");
const models_1 = __webpack_require__(/*! ../models */ "./libs/common/src/models/index.ts");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const envPath = fs.existsSync(path.resolve(process.cwd(), '.env.development'))
    ? path.resolve(process.cwd(), '.env.development')
    : path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: process.env.DB_DIALECT || 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [models_1.User, models_1.Todo, models_1.Team, models_1.Calendar, models_1.Role, models_1.UserTeamRole, models_1.FileModel],
                autoLoadModels: true,
                synchronize: false,
                logging: false,
            }),
        ],
        exports: [sequelize_1.SequelizeModule],
    })
], DatabaseModule);


/***/ },

/***/ "./libs/common/src/decorator/get-user.decorator.ts"
/*!*********************************************************!*\
  !*** ./libs/common/src/decorator/get-user.decorator.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ },

/***/ "./libs/common/src/decorator/roles.decorator.ts"
/*!******************************************************!*\
  !*** ./libs/common/src/decorator/roles.decorator.ts ***!
  \******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ },

/***/ "./libs/common/src/enums/role.enum.ts"
/*!********************************************!*\
  !*** ./libs/common/src/enums/role.enum.ts ***!
  \********************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "user";
    RoleEnum["ADMIN"] = "admin";
    RoleEnum["MANAGER"] = "manager";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));


/***/ },

/***/ "./libs/common/src/exceptions/global-exception.filter.ts"
/*!***************************************************************!*\
  !*** ./libs/common/src/exceptions/global-exception.filter.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalExceptionFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? exception.getResponse()
            : { message: exception.message || 'Internal server error' };
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            ...(typeof message === 'object' ? message : { message }),
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);


/***/ },

/***/ "./libs/common/src/guards/jwt-auth.guard.ts"
/*!**************************************************!*\
  !*** ./libs/common/src/guards/jwt-auth.guard.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./libs/common/src/guards/jwt.strategy.ts"
/*!************************************************!*\
  !*** ./libs/common/src/guards/jwt.strategy.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const dotenv = __importStar(__webpack_require__(/*! dotenv */ "dotenv"));
const user_model_1 = __webpack_require__(/*! ../models/user.model */ "./libs/common/src/models/user.model.ts");
dotenv.config();
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    let data = request?.cookies['token'];
                    if (!data) {
                        data = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(request);
                    }
                    return data;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'calander',
        });
    }
    async validate(payload) {
        const user = await user_model_1.User.findByPk(payload.id);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user.get({ plain: true });
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);


/***/ },

/***/ "./libs/common/src/guards/roles.guard.ts"
/*!***********************************************!*\
  !*** ./libs/common/src/guards/roles.guard.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const roles_decorator_1 = __webpack_require__(/*! ../decorator/roles.decorator */ "./libs/common/src/decorator/roles.decorator.ts");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.role) {
            return false;
        }
        return requiredRoles.includes(user.role.trim());
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ },

/***/ "./libs/common/src/index.ts"
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./common.module */ "./libs/common/src/common.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./common.service */ "./libs/common/src/common.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./database/database.module */ "./libs/common/src/database/database.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./exceptions/global-exception.filter */ "./libs/common/src/exceptions/global-exception.filter.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/jwt-auth.guard */ "./libs/common/src/guards/jwt-auth.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/jwt.strategy */ "./libs/common/src/guards/jwt.strategy.ts"), exports);
__exportStar(__webpack_require__(/*! ./guards/roles.guard */ "./libs/common/src/guards/roles.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./decorator/roles.decorator */ "./libs/common/src/decorator/roles.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./models */ "./libs/common/src/models/index.ts"), exports);
__exportStar(__webpack_require__(/*! ./enums/role.enum */ "./libs/common/src/enums/role.enum.ts"), exports);


/***/ },

/***/ "./libs/common/src/models/calendar.model.ts"
/*!**************************************************!*\
  !*** ./libs/common/src/models/calendar.model.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Calendar = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/common/src/models/user.model.ts");
const team_model_1 = __webpack_require__(/*! ./team.model */ "./libs/common/src/models/team.model.ts");
const file_model_1 = __webpack_require__(/*! ./file.model */ "./libs/common/src/models/file.model.ts");
let Calendar = class Calendar extends sequelize_typescript_1.Model {
    name;
    type;
    start_time;
    end_time;
    status;
    user_id;
    assigner_id;
    user;
    assignee;
    team_id;
    team;
    file_id;
    file;
};
exports.Calendar = Calendar;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Calendar.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Calendar.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Calendar.prototype, "start_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Calendar.prototype, "end_time", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Calendar.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Calendar.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Calendar.prototype, "assigner_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'user_id'),
    __metadata("design:type", typeof (_c = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _c : Object)
], Calendar.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, 'assigner_id'),
    __metadata("design:type", typeof (_d = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _d : Object)
], Calendar.prototype, "assignee", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => team_model_1.Team),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Calendar.prototype, "team_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => team_model_1.Team),
    __metadata("design:type", typeof (_e = typeof team_model_1.Team !== "undefined" && team_model_1.Team) === "function" ? _e : Object)
], Calendar.prototype, "team", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => file_model_1.FileModel),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Calendar.prototype, "file_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => file_model_1.FileModel),
    __metadata("design:type", typeof (_f = typeof file_model_1.FileModel !== "undefined" && file_model_1.FileModel) === "function" ? _f : Object)
], Calendar.prototype, "file", void 0);
exports.Calendar = Calendar = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Calendars', timestamps: true })
], Calendar);


/***/ },

/***/ "./libs/common/src/models/file.model.ts"
/*!**********************************************!*\
  !*** ./libs/common/src/models/file.model.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileModel = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let FileModel = class FileModel extends sequelize_typescript_1.Model {
    file_path;
    file_name;
};
exports.FileModel = FileModel;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], FileModel.prototype, "file_path", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], FileModel.prototype, "file_name", void 0);
exports.FileModel = FileModel = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Files', timestamps: true })
], FileModel);


/***/ },

/***/ "./libs/common/src/models/index.ts"
/*!*****************************************!*\
  !*** ./libs/common/src/models/index.ts ***!
  \*****************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./user.model */ "./libs/common/src/models/user.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./todo.model */ "./libs/common/src/models/todo.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./team.model */ "./libs/common/src/models/team.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./calendar.model */ "./libs/common/src/models/calendar.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./role.model */ "./libs/common/src/models/role.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./user-team-role.model */ "./libs/common/src/models/user-team-role.model.ts"), exports);
__exportStar(__webpack_require__(/*! ./file.model */ "./libs/common/src/models/file.model.ts"), exports);


/***/ },

/***/ "./libs/common/src/models/role.model.ts"
/*!**********************************************!*\
  !*** ./libs/common/src/models/role.model.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const user_team_role_model_1 = __webpack_require__(/*! ./user-team-role.model */ "./libs/common/src/models/user-team-role.model.ts");
let Role = class Role extends sequelize_typescript_1.Model {
    name;
    userTeamRoles;
};
exports.Role = Role;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_team_role_model_1.UserTeamRole),
    __metadata("design:type", Array)
], Role.prototype, "userTeamRoles", void 0);
exports.Role = Role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Roles', timestamps: true })
], Role);


/***/ },

/***/ "./libs/common/src/models/team.model.ts"
/*!**********************************************!*\
  !*** ./libs/common/src/models/team.model.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Team = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/common/src/models/user.model.ts");
const user_team_role_model_1 = __webpack_require__(/*! ./user-team-role.model */ "./libs/common/src/models/user-team-role.model.ts");
const calendar_model_1 = __webpack_require__(/*! ./calendar.model */ "./libs/common/src/models/calendar.model.ts");
let Team = class Team extends sequelize_typescript_1.Model {
    name;
    users;
    calendars;
    userTeamRoles;
};
exports.Team = Team;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => user_team_role_model_1.UserTeamRole),
    __metadata("design:type", Array)
], Team.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => calendar_model_1.Calendar),
    __metadata("design:type", Array)
], Team.prototype, "calendars", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_team_role_model_1.UserTeamRole),
    __metadata("design:type", Array)
], Team.prototype, "userTeamRoles", void 0);
exports.Team = Team = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Teams', timestamps: true })
], Team);


/***/ },

/***/ "./libs/common/src/models/todo.model.ts"
/*!**********************************************!*\
  !*** ./libs/common/src/models/todo.model.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Todo = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
let Todo = class Todo extends sequelize_typescript_1.Model {
    title;
    description;
    due_date;
    is_completed;
};
exports.Todo = Todo;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Todo.prototype, "due_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Todo.prototype, "is_completed", void 0);
exports.Todo = Todo = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Todos', timestamps: false })
], Todo);


/***/ },

/***/ "./libs/common/src/models/user-team-role.model.ts"
/*!********************************************************!*\
  !*** ./libs/common/src/models/user-team-role.model.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTeamRole = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const user_model_1 = __webpack_require__(/*! ./user.model */ "./libs/common/src/models/user.model.ts");
const team_model_1 = __webpack_require__(/*! ./team.model */ "./libs/common/src/models/team.model.ts");
const role_model_1 = __webpack_require__(/*! ./role.model */ "./libs/common/src/models/role.model.ts");
let UserTeamRole = class UserTeamRole extends sequelize_typescript_1.Model {
    user_id;
    user;
    team_id;
    team;
    role_id;
    role;
};
exports.UserTeamRole = UserTeamRole;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserTeamRole.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], UserTeamRole.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => team_model_1.Team),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserTeamRole.prototype, "team_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => team_model_1.Team),
    __metadata("design:type", typeof (_b = typeof team_model_1.Team !== "undefined" && team_model_1.Team) === "function" ? _b : Object)
], UserTeamRole.prototype, "team", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => role_model_1.Role),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], UserTeamRole.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => role_model_1.Role),
    __metadata("design:type", typeof (_c = typeof role_model_1.Role !== "undefined" && role_model_1.Role) === "function" ? _c : Object)
], UserTeamRole.prototype, "role", void 0);
exports.UserTeamRole = UserTeamRole = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'UserTeamRoles', timestamps: true })
], UserTeamRole);


/***/ },

/***/ "./libs/common/src/models/user.model.ts"
/*!**********************************************!*\
  !*** ./libs/common/src/models/user.model.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const sequelize_typescript_1 = __webpack_require__(/*! sequelize-typescript */ "sequelize-typescript");
const team_model_1 = __webpack_require__(/*! ./team.model */ "./libs/common/src/models/team.model.ts");
const user_team_role_model_1 = __webpack_require__(/*! ./user-team-role.model */ "./libs/common/src/models/user-team-role.model.ts");
const calendar_model_1 = __webpack_require__(/*! ./calendar.model */ "./libs/common/src/models/calendar.model.ts");
let User = class User extends sequelize_typescript_1.Model {
    name;
    email;
    password;
    role;
    is_active;
    teams;
    calendars;
    userTeamRoles;
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => team_model_1.Team, () => user_team_role_model_1.UserTeamRole),
    __metadata("design:type", Array)
], User.prototype, "teams", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => calendar_model_1.Calendar),
    __metadata("design:type", Array)
], User.prototype, "calendars", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_team_role_model_1.UserTeamRole),
    __metadata("design:type", Array)
], User.prototype, "userTeamRoles", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Users', timestamps: true })
], User);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@nestjs/platform-express"
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
(module) {

module.exports = require("@nestjs/platform-express");

/***/ },

/***/ "@nestjs/sequelize"
/*!************************************!*\
  !*** external "@nestjs/sequelize" ***!
  \************************************/
(module) {

module.exports = require("@nestjs/sequelize");

/***/ },

/***/ "@nestjs/serve-static"
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
(module) {

module.exports = require("@nestjs/serve-static");

/***/ },

/***/ "argon2"
/*!*************************!*\
  !*** external "argon2" ***!
  \*************************/
(module) {

module.exports = require("argon2");

/***/ },

/***/ "class-transformer"
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
(module) {

module.exports = require("class-transformer");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "cookie-parser"
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
(module) {

module.exports = require("cookie-parser");

/***/ },

/***/ "dotenv"
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
(module) {

module.exports = require("dotenv");

/***/ },

/***/ "express"
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
(module) {

module.exports = require("express");

/***/ },

/***/ "multer"
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
(module) {

module.exports = require("multer");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ },

/***/ "rxjs/operators"
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
(module) {

module.exports = require("rxjs/operators");

/***/ },

/***/ "sequelize"
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
(module) {

module.exports = require("sequelize");

/***/ },

/***/ "sequelize-typescript"
/*!***************************************!*\
  !*** external "sequelize-typescript" ***!
  \***************************************/
(module) {

module.exports = require("sequelize-typescript");

/***/ },

/***/ "fs"
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
(module) {

module.exports = require("fs");

/***/ },

/***/ "path"
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
(module) {

module.exports = require("path");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./apps/api/src/main.ts");
/******/ 	
/******/ })()
;