const { registerUser, verifyUserEmail, loginUser } = require('../../../../../src/api/v1/services/user.service');

const handlerRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);

        const { password: pw, ...safeUser } = user.toObject();
        res.json({
            success: true,
            message: 'Đăng ký thành công, vui lòng kiểm tra email để xác nhận',
            user: safeUser,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

const handlerVerifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        const user = await verifyUserEmail(token);

        res.json({ success: true, message: 'Xác nhận email thành công', user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const handlerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);

        if (!result) {
            return res.status(401).json({ success: false, message: 'Sai email hoặc mật khẩu' });
        }
        if (result.error) {
            return res.status(403).json({ success: false, message: result.error });
        }

        const { password: pw, ...safeUser } = result.user.toObject();
        res.json({ success: true, token: result.token, user: safeUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { handlerRegister, handlerVerifyEmail, handlerLogin };
