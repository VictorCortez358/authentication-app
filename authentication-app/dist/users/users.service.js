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
exports.UsersServices = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersServices = class UsersServices {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createUser(user, photo) {
        return this.prismaService.user.create({
            data: {
                ...user,
                photo: photo
            }
        });
    }
    async findOneUser(id) {
        return this.prismaService.user.findUnique({
            where: { id }
        });
    }
    async findOneUserByEmail(email) {
        return this.prismaService.user.findUnique({
            where: { email }
        });
    }
    async updateUser(id, user) {
        const emailExist = await this.prismaService.user.findUnique({
            where: { email: user.email }
        });
        if (emailExist) {
            return JSON.stringify('Email already exists');
        }
        if (user.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
        try {
            await this.prismaService.user.update({
                where: { id },
                data: user
            });
            return JSON.stringify('User updated successfully');
        }
        catch (error) {
            if (error.code === 'P2025') {
                return JSON.stringify('User not found');
            }
            return JSON.stringify('An error occurred during the update');
        }
    }
};
exports.UsersServices = UsersServices;
exports.UsersServices = UsersServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersServices);
//# sourceMappingURL=users.service.js.map