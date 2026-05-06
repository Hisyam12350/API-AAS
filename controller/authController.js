import { Connection } from "mysql2/promise"
import jwt from "jsonwebtoken"
import connection from "../database.js"

export async function login(req, res) {
    // email wajib di isi
    if (!req.body.email || !req.body.password) {
        res.json({
            message : "email & password wajib di isi"
        })
    }

    // cari user bedasarkan email
    const [user] = await connection.query(
        `select * from users where email = "${req.body.email}"`
    )

    if (!user.length) {
        res.json({
            message: "login gagal"
        })
    }

    // cek password benar/salah
    if (req.body.password != user[0].password) {
        res.json({
        message: "login gagal"
    })
}

    // generate token
    const token = jwt.sign(user[0], "supersecret");

    res.status(400).json({
        "message" : "Success!",
        "token"   : token
    })
}