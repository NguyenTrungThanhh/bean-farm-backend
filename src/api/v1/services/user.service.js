const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const UserModel = require('../../../../src/api/v1/models/user.model');
const config = require('../../../../src/api/v1/configs/app.config');

// --- Tạo transporter chung
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- Đăng ký user
const registerUser = async (name, email, password) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashed });

    // tạo token verify (chỉ để xác thực email)
    const verifyToken = jwt.sign({ id: user._id }, config.jwtSecret, {
        expiresIn: '1d',
    });

    const verifyUrl = `${config.frontendUrl}/verify-email?token=${verifyToken}`;

    await transporter.sendMail({
        from: `"Bean Farm" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Xác nhận tài khoản của bạn',
        html: `
            <p>Xin chào ${name},</p>
            <p>Vui lòng click link dưới đây để kích hoạt tài khoản:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
        `,
    });

    return user;
};

// --- Verify email
const verifyUserEmail = async (token) => {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error('Người dùng không tồn tại');
    if (user.isVerified) return user;

    user.isVerified = true;
    await user.save();
    return user;
};

// --- Đăng nhập
const loginUser = async (email, password) => {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    if (!user.isVerified) {
        return { error: 'Email chưa xác nhận, vui lòng kiểm tra hộp thư' };
    }

    const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

    return { token, user };
};

module.exports = { registerUser, verifyUserEmail, loginUser };
