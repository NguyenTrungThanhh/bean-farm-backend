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
        from: `"Không Khoảng Cách Logistics" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Xác nhận tài khoản của bạn',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1F2937; line-height: 1.6;">
                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #E5E7EB; border-radius: 12px; background-color: #ffffff;">
                    
                    <h2 style="color: #111827; font-size: 24px; margin-bottom: 16px;">Chào ${name},</h2>
                    
                    <p style="font-size: 16px; margin-bottom: 24px;">
                    Cảm ơn bạn đã đăng ký tại <strong>Không Khoảng Cách Logistics</strong>. 
                    Vui lòng nhấn nút dưới đây để xác nhận tài khoản của bạn:
                    </p>
                    
                    <div style="text-align: center; margin-bottom: 24px;">
                    <a 
                        href="${verifyUrl}" 
                        style="display: inline-block; padding: 12px 24px; background-color: #3B82F6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background-color 0.3s;"
                        onMouseOver="this.style.backgroundColor='#2563EB'"
                        onMouseOut="this.style.backgroundColor='#3B82F6'"
                    >
                        Xác nhận tài khoản
                    </a>
                    </div>
                    
                    <p style="font-size: 14px; color: #6B7280;">
                    Nếu bạn không tạo tài khoản này, vui lòng bỏ qua email này.
                    </p>

                    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 24px 0;" />

                    <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
                    &copy; 2025 Không Khoảng Cách Logistics. Mọi quyền được bảo lưu.
                    </p>

                </div>
            </div>
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

const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (err) {
        return null;
    }
};

module.exports = { registerUser, verifyUserEmail, loginUser, verifyToken };
