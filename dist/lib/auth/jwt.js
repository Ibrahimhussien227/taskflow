"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAccessToken = signAccessToken;
exports.signRefreshToken = signRefreshToken;
exports.verifyToken = verifyToken;
const jose_1 = require("jose");
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "supersecret");
const ACCESS_EXPIRES_IN = 15 * 60; // 15 minutes
const REFRESH_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days
// Generate Access Token
async function signAccessToken(user) {
    return await new jose_1.SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${ACCESS_EXPIRES_IN}s`)
        .sign(JWT_SECRET);
}
// Generate Refresh Token
async function signRefreshToken(user) {
    return await new jose_1.SignJWT(user)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${REFRESH_EXPIRES_IN}s`)
        .sign(JWT_SECRET);
}
// Verify any token
async function verifyToken(token) {
    try {
        const { payload } = await (0, jose_1.jwtVerify)(token, JWT_SECRET);
        return payload;
    }
    catch {
        return null;
    }
}
