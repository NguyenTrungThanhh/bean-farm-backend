const { verifyToken } = require('../services/auth.service');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Missing token' });

    const decoded = verifyToken(token);
    if (!decoded) return res.status(403).json({ message: 'Invalid token' });

    req.user = decoded; // { id, role }
    next();
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
