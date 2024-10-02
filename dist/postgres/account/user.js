"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserInfo = void 0;
exports.userExists = userExists;
exports.createUser = createUser;
exports.login = login;
exports.findById = findById;
exports.deleteAccount = deleteAccount;
exports.findByEmail = findByEmail;
const client_1 = require("@prisma/client");
const hashPassword_1 = require("../../utils/hashPassword");
const prisma = new client_1.PrismaClient();
function userExists(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const exists = yield prisma.user.findUnique({
                where: {
                    email: user.email,
                },
            });
            return exists ? true : false;
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.user.create({
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                },
            });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loggedUser = yield prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (loggedUser && (0, hashPassword_1.compare)(password, loggedUser.password)) {
                return loggedUser;
            }
            return null;
        }
        catch (err) {
            console.error("Error logging in:", err);
            return null;
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userById = prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return userById;
    });
}
function deleteAccount(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const loggedUser = yield prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (loggedUser && (0, hashPassword_1.compare)(password, loggedUser.password)) {
            const deletedAccount = yield prisma.user.delete({
                where: {
                    email: email
                }
            });
            return deletedAccount;
        }
        return null;
    });
}
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return user ? user : null;
    });
}
class UpdateUserInfo {
    constructor(userId) {
        this.userId = userId;
    }
    updatePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield prisma.user.update({
                    where: { id: this.userId },
                    data: { password: newPassword }
                });
                return updatedUser;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                prisma.$disconnect();
            }
        });
    }
}
exports.UpdateUserInfo = UpdateUserInfo;
