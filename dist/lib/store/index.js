"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const authApi_1 = require("./slices/authApi");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        [authApi_1.authApi.reducerPath]: authApi_1.authApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(authApi_1.authApi.middleware),
});
