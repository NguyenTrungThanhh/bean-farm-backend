require('dotenv').config();

const config = {
    jwtSecret: process.env.JWT_SECRET || 'supersecret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    port: process.env.PORT || 4000,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// check biến bắt buộc
const requiredEnvs = ['JWT_SECRET', 'EMAIL_USER', 'EMAIL_PASS'];
requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
    }
});

module.exports = config;
