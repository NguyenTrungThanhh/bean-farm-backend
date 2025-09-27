const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const connectDatabase = require('../src/api/v1/configs/db.config');
const caseFormatter = require('../src/api/v1/middleware/formatCase');

const port = process.env.PORT || 4000;

dotenv.config();

connectDatabase();

app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
        credentials: true,
    }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(caseFormatter);

const adminRoute = require('../src/api/v1/routes/admin');
const clientRoute = require('../src/api/v1/routes/client');

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/client', clientRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

(async () => {
    const plainPassword = 'BeanFarm@2025'; // mật khẩu bạn muốn đặt cho admin
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log('Plain password:', plainPassword);
    console.log('Hashed password:', hashedPassword);
})();

app.listen(port, () => {
    console.log('Server is running...');
});
