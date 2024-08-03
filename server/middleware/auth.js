const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const token = authHeader.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Authorization error' });
    }
};

module.exports = auth;
