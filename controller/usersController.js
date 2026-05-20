import connection from "../database.js";
import bcrypt from "bcrypt";

export async function getUsers(req, res) {
  // 1. ngequery data users
  const [users] = await connection.query(
    "select id, username, email, password, role from tb_users",
  );

  // 2. ngersponse ke client
  res.status(200).json({
    message: "success",
    data: users,
    ok: true,
  });
}

export async function createUser(req, res) {
  // 1. ambil data dari body
  const { username, email, role, password } = req.body;

  // 2. username, email, password, role wajib di isi
  if (!username || !email || !role || !password) {
    return res.status(400).json({
      message: "username, email, password, role wajib di isi",
    });
  }

  try {
    const handedPassword = await bcrypt.hash(password, 10);

    // 3. masukkan data ke database
    const [user] = await connection.query(
      "insert into tb_users (username, email, role, password) values (?, ?, ?, ?)",
      [username, email, role, handedPassword],
    );

    res.status(201).json({
      message: "success",
      data: user,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, password, nomor_telepon, alamat, bio } = req.body;

  const [user] = await connection.query(
    "update tb_users set username = ?, email = ?, password = ?, nomor_telepon = ?, alamat = ?, bio = ? where id = ?",
    [username, email, password, nomor_telepon, alamat, bio, id],
  );
  res.status(200).json({
    message: "success",
    data: user,
    ok: true,
  });
}

export async function tambahGambarUser(req, res) {
  const { id } = req.params;
  const gambar = req.file ? req.file.filename : null;
  console.log("req.file:", req.file); // ← cek apakah file diterima
  console.log("gambar:", gambar);

  try {
    const [cek] = await connection.query(
      "select * from tb_users where id = ?",
      [id],
    );
    if (cek.length === 0) {
      return res.status(400).json({
        message: "user tidak ditemukan",
      });
    }

    const [user] = await connection.query(
      "update tb_users set fotoProfile = ? where id = ?",
      [gambar, id],
    );

    res.status(200).json({
      message: "success",
      data: user,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const [user] = await connection.query("delete from tb_users where id = ?", [
    id,
  ]);
  res.status(200).json({
    message: "success",
    data: user,
    ok: true,
  });
}

export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const [user] = await connection.query(
      "select * from tb_users where id = ?",
      [id],
    );
    res.status(200).json({
      message: "success",
      data: user,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}
