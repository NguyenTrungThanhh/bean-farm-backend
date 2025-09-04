const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDatabase = require('../src/api/v1/configs/db.config');

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

const adminRoute = require('../src/api/v1/routes/admin');
const clientRoute = require('../src/api/v1/routes/client');

app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/client', clientRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log('Server is running...');
});
