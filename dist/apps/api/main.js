/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const cookie_parser_1 = __importDefault(__webpack_require__(3));
const api_module_1 = __webpack_require__(4);
const common_2 = __webpack_require__(5);
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
        origin: ['http://localhost:4000', 'https://calander-inky.vercel.app'],
        credentials: true,
    });
    app.setGlobalPrefix('api/v1');
    const port = process.env.PORT || 3001;
    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
const auth_module_1 = __webpack_require__(30);
const todos_module_1 = __webpack_require__(39);
const teams_module_1 = __webpack_require__(44);
const calendars_module_1 = __webpack_require__(49);
const upload_module_1 = __webpack_require__(54);
const serve_static_1 = __webpack_require__(58);
const path_1 = __webpack_require__(21);
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


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);
__exportStar(__webpack_require__(8), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(23), exports);
__exportStar(__webpack_require__(25), exports);
__exportStar(__webpack_require__(27), exports);
__exportStar(__webpack_require__(28), exports);
__exportStar(__webpack_require__(10), exports);
__exportStar(__webpack_require__(29), exports);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(2);
const common_service_1 = __webpack_require__(7);
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [common_service_1.CommonService],
        exports: [common_service_1.CommonService],
    })
], CommonModule);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(2);
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const sequelize_1 = __webpack_require__(9);
const models_1 = __webpack_require__(10);
const dotenv = __importStar(__webpack_require__(19));
const fs = __importStar(__webpack_require__(20));
const path = __importStar(__webpack_require__(21));
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


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
__exportStar(__webpack_require__(11), exports);
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(13), exports);
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(15), exports);
__exportStar(__webpack_require__(14), exports);
__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
const team_model_1 = __webpack_require__(13);
const user_team_role_model_1 = __webpack_require__(14);
const calendar_model_1 = __webpack_require__(16);
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


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(11);
const user_team_role_model_1 = __webpack_require__(14);
const calendar_model_1 = __webpack_require__(16);
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


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(11);
const team_model_1 = __webpack_require__(13);
const role_model_1 = __webpack_require__(15);
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


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
const user_team_role_model_1 = __webpack_require__(14);
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


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
const user_model_1 = __webpack_require__(11);
const team_model_1 = __webpack_require__(13);
const file_model_1 = __webpack_require__(17);
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


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
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


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const sequelize_typescript_1 = __webpack_require__(12);
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


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalExceptionFilter = void 0;
const common_1 = __webpack_require__(2);
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


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(24);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const passport_jwt_1 = __webpack_require__(26);
const passport_1 = __webpack_require__(24);
const common_1 = __webpack_require__(2);
const dotenv = __importStar(__webpack_require__(19));
const user_model_1 = __webpack_require__(11);
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


/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(1);
const roles_decorator_1 = __webpack_require__(28);
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
        console.log(requiredRoles.includes(user.role.trim()));
        return requiredRoles.includes(user.role.trim());
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEnum = void 0;
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["USER"] = "user";
    RoleEnum["ADMIN"] = "admin";
    RoleEnum["MANAGER"] = "manager";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(31);
const auth_controller_1 = __webpack_require__(32);
const auth_service_1 = __webpack_require__(34);
const passport_1 = __webpack_require__(24);
const common_2 = __webpack_require__(5);
const dotenv = __importStar(__webpack_require__(19));
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


/***/ }),
/* 31 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(33);
const auth_service_1 = __webpack_require__(34);
const register_dto_1 = __webpack_require__(36);
const login_dto_1 = __webpack_require__(38);
const common_2 = __webpack_require__(5);
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
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return result;
    }
    async logout(res) {
        res.clearCookie('token');
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
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(31);
const common_2 = __webpack_require__(5);
const argon2 = __importStar(__webpack_require__(35));
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


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(37);
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


/***/ }),
/* 37 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(37);
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


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosModule = void 0;
const common_1 = __webpack_require__(2);
const todos_service_1 = __webpack_require__(40);
const todos_controller_1 = __webpack_require__(41);
let TodosModule = class TodosModule {
};
exports.TodosModule = TodosModule;
exports.TodosModule = TodosModule = __decorate([
    (0, common_1.Module)({
        controllers: [todos_controller_1.TodosController, todos_controller_1.CheckTodosController],
        providers: [todos_service_1.TodosService],
    })
], TodosModule);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodosService = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
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


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const todos_service_1 = __webpack_require__(40);
const create_todo_dto_1 = __webpack_require__(42);
const update_todo_dto_1 = __webpack_require__(43);
const common_2 = __webpack_require__(5);
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


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(37);
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


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(37);
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


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsModule = void 0;
const common_1 = __webpack_require__(2);
const teams_service_1 = __webpack_require__(45);
const teams_controller_1 = __webpack_require__(46);
let TeamsModule = class TeamsModule {
};
exports.TeamsModule = TeamsModule;
exports.TeamsModule = TeamsModule = __decorate([
    (0, common_1.Module)({
        controllers: [teams_controller_1.TeamsController],
        providers: [teams_service_1.TeamsService],
    })
], TeamsModule);


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TeamsService = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
let TeamsService = class TeamsService {
    async create(userId, createTeamDto) {
        const team = await common_2.Team.create({ name: createTeamDto.name });
        await common_2.UserTeamRole.create({
            user_id: userId,
            team_id: team.id,
            role_id: 1,
        });
        return { message: 'Tạo nhóm thành công', team };
    }
    async findUserTeams(userId) {
        const user = await common_2.User.findByPk(userId, {
            include: [
                {
                    model: common_2.Team,
                    through: { attributes: ['role_id'] },
                    include: [{
                            model: common_2.User,
                            attributes: ['id', 'name', 'email'],
                            through: { attributes: [] }
                        }]
                },
            ],
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const cleanUser = user.get({ plain: true });
        return cleanUser.teams ?? [];
    }
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)()
], TeamsService);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.TeamsController = void 0;
const common_1 = __webpack_require__(2);
const teams_service_1 = __webpack_require__(45);
const create_team_dto_1 = __webpack_require__(47);
const common_2 = __webpack_require__(5);
const get_user_decorator_1 = __webpack_require__(48);
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
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_2.Roles)(common_2.RoleEnum.ADMIN),
    (0, common_1.Post)('team'),
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
exports.TeamsController = TeamsController = __decorate([
    (0, common_1.Controller)('team'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard, common_2.RolesGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof teams_service_1.TeamsService !== "undefined" && teams_service_1.TeamsService) === "function" ? _a : Object])
], TeamsController);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(37);
class CreateTeamDto {
    name;
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUser = void 0;
const common_1 = __webpack_require__(2);
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarsModule = void 0;
const common_1 = __webpack_require__(2);
const calendars_service_1 = __webpack_require__(50);
const calendars_controller_1 = __webpack_require__(52);
let CalendarsModule = class CalendarsModule {
};
exports.CalendarsModule = CalendarsModule;
exports.CalendarsModule = CalendarsModule = __decorate([
    (0, common_1.Module)({
        controllers: [calendars_controller_1.CalendarsController],
        providers: [calendars_service_1.CalendarsService],
    })
], CalendarsModule);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalendarsService = void 0;
const common_1 = __webpack_require__(2);
const common_2 = __webpack_require__(5);
const sequelize_1 = __webpack_require__(51);
let CalendarsService = class CalendarsService {
    async findAllForAdmin() {
        return common_2.Calendar.findAll({ include: [{ model: common_2.FileModel }] });
    }
    async findAllForUser(userId) {
        const userTeams = await common_2.UserTeamRole.findAll({ where: { user_id: userId } });
        const teamIds = userTeams.map((ut) => ut.team_id);
        return common_2.Calendar.findAll({
            where: {
                [sequelize_1.Op.or]: [
                    { user_id: userId },
                    { assigner_id: userId },
                    { team_id: { [sequelize_1.Op.in]: teamIds } }
                ]
            },
            include: [{ model: common_2.FileModel }]
        });
    }
    async createWithRules(user, calendarDto) {
        let payload = { ...calendarDto };
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
        return { message: 'Tạo lịch thành công', calendar };
    }
    async updateStatus(id, user, status, file_id) {
        const calendarInstance = await common_2.Calendar.findByPk(id);
        if (!calendarInstance)
            throw new common_1.NotFoundException('Lịch không tồn tại');
        const calendar = calendarInstance.get({ plain: true });
        if (user.role !== 'admin' && calendar.user_id !== user.id && calendar.assigner_id !== user.id) {
            throw new common_1.ForbiddenException('Bạn không có quyền chuyển trạng thái');
        }
        if (status === 'completed') {
            await calendarInstance.update({
                status: 'completed',
                file_id: file_id
            });
        }
        else {
            await calendarInstance.update({
                status: 'pending',
                file_id: null
            });
        }
        return {
            message: 'Cập nhật trạng thái thành công',
            calendar: calendarInstance.get({ plain: true })
        };
    }
    async update(id, calendarDto) {
        const calendar = await common_2.Calendar.findByPk(id);
        console.log("calendar", calendarDto);
        if (!calendar)
            throw new common_1.NotFoundException('Lịch không tồn tại');
        await calendar.update(calendarDto);
        return { message: 'Cập nhật thành công', calendar };
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


/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const calendars_service_1 = __webpack_require__(50);
const calendar_dto_1 = __webpack_require__(53);
const common_2 = __webpack_require__(5);
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
    update(id, calendarDto) {
        return this.calendarsService.update(id, calendarDto);
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
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_c = typeof calendar_dto_1.CalendarDto !== "undefined" && calendar_dto_1.CalendarDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CalendarsController.prototype, "update", null);
__decorate([
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


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const class_validator_1 = __webpack_require__(37);
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


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const common_1 = __webpack_require__(2);
const upload_controller_1 = __webpack_require__(55);
const platform_express_1 = __webpack_require__(56);
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


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(2);
const platform_express_1 = __webpack_require__(56);
const multer_1 = __webpack_require__(57);
const path_1 = __webpack_require__(21);
const common_2 = __webpack_require__(5);
let UploadController = class UploadController {
    async uploadFile(file) {
        if (!file)
            return { error: 'No file uploaded' };
        const baseUrl = process.env.BASE_URL;
        const fileUrl = `${baseUrl}/uploads/${file.filename}`;
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


/***/ }),
/* 56 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 57 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 58 */
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ })
/******/ 	]);
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
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;