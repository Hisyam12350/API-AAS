// middleware/roleMiddleware.js

export function adminOnly(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Akses ditolak. Hanya admin yang bisa mengakses ini."
        })
    }
    next()
}

export function superAdminOnly(req, res, next) {
    if (req.user.role !== "super admin") {
        return res.status(403).json({
            message: "Akses ditolak. Hanya super admin yang bisa mengakses ini."
        })
    }
    next()
}

export function usersOnly(req, res, next) {
    if (req.user.role !== "users") {
        return res.status(403).json({
            message: "Akses ditolak."
        })
    }
    next()
}