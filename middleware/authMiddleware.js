import jwt from "jsonwebtoken"

export function jwtMiddleware (req, res, next) {
    // 1. cek token ada atau tidak
    const token = req.headers["authorization"]
    if (!token) {
        return res.status(400).json({
            message : "tidak teridentifikasi"
        })
    }
    
    // 2. setelah token ada, verify token
    const tokenTrimmed = token.split(" ")[1]
    jwt.verify(tokenTrimmed, "supersecret", (error, decoded) => {
        if (error) {
            return res.status(400).json({
                message : "tidak teridentifikasi"
            })
        }
        // 3. jika berhasil, lanjut
        next()
    })
}
