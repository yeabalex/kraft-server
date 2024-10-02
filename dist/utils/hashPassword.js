"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
exports.compare = compare;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRound = 10;
function hash(password) {
    const salt = bcrypt_1.default.genSaltSync(saltRound);
    return bcrypt_1.default.hashSync(password, salt);
}
function compare(plain, hashed) {
    return bcrypt_1.default.compareSync(plain, hashed);
}
