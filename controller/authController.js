import { Connection } from "mysql2/promise";
import jwt from "jsonwebtoken";
import connection from "../database.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
  // email wajib di isi
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "email & password wajib di isi",
    });
  }
  try {
    const [user] = await connection.query(
      "select * from tb_users where email = ?",
      [req.body.email],
    )

    if (!user.length) {
      return res.status(400).json({
        message: "login gagal", 
      });
    }

    // cari user bedasarkan email
    const isMatch = await bcrypt.compare(req.body.password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({
        message: "login gagal",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      "supersecret",
      { expiresIn: "1d" },
    );
    
    res.status(200).json({
      message: "Success!",
      token: token,
      role: user[0].role
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
