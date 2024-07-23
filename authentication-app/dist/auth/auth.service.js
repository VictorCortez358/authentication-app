"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userServices, jwtService) {
        this.userServices = userServices;
        this.jwtService = jwtService;
    }
    async signUp(user, photo) {
        const userExist = await this.userServices.findOneUserByEmail(user.email);
        if (userExist) {
            throw new common_1.BadRequestException('User already exists');
        }
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const newUser = this.userServices.createUser(user, photo);
        if (!newUser) {
            return JSON.stringify('User not created');
        }
        else {
            return JSON.stringify(newUser);
        }
    }
    async signIn(email, pass) {
        const user = await this.userServices.findOneUserByEmail(email);
        if (!user) {
            return {
                message: 'User not found',
                access_token: null
            };
        }
        if (user?.password && !(await bcrypt.compare(pass, user.password))) {
            return {
                message: 'Wrong password',
                access_token: null
            };
        }
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        return {
            message: 'User logged in',
            access_token: token
        };
    }
    async googleLogin(user) {
        if (!user) {
            return 'No user from google';
        }
        const payload = { email: user.email, sub: user.sub, name: user.name, picture: user.picture };
        const token = this.jwtService.sign(payload);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersServices,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map