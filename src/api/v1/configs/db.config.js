const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load biến môi trường
dotenv.config();

const connectDatabase = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('❌ MONGODB_URL không được định nghĩa trong file .env');
        }

        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Kết nối MongoDB thất bại: ${error.message}`);
        process.exit(1); // Thoát chương trình nếu không kết nối được
    }
};

module.exports = connectDatabase;
