// middleware/authMiddleware.js
function authenticateSession(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Access denied. Please log in.' });
    }
    req.user = { userId: req.session.userId };
    next();
}

module.exports = authenticateSession;