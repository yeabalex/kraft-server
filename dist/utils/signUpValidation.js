"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
exports.signUpSchema = {
    firstName: {
        notEmpty: {
            errorMessage: "First name can't be empty"
        },
        isAlpha: {
            errorMessage: "Only alphabetical characters"
        },
        isString: {
            errorMessage: "Must be a string"
        }
    },
    lastName: {
        notEmpty: {
            errorMessage: "Last name can't be empty"
        },
        isAlpha: {
            errorMessage: "Only alphabetical characters"
        },
        isString: {
            errorMessage: "Must be a string"
        }
    },
    email: {
        notEmpty: {
            errorMessage: "Email can't be empty"
        },
        isEmail: {
            errorMessage: "Provide a valid email please"
        },
        isString: {
            errorMessage: "Must be a string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password can't be empty"
        },
        isString: {
            errorMessage: "Must be a string"
        },
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters long"
        },
        matches: {
            options: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
            errorMessage: "Password must contain at least one number and one special symbol"
        }
    }
};
