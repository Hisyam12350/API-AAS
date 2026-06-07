import connection from "../database.js";

export async function getBalasKomentar(req, res) {
  try {
    const [balasKomentar] = await connection.query(
      "SELECT a.id, b.id as id_balas, b.balas_komentar FROM tb_komentar a JOIN tb_balas_komentar b ON a.id = b.id_komentar",
    );

    res.status(200).json({
      message: "success",
      data: balasKomentar,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

export async function createBalasKomentar(req, res) {
  const id_user = req.user.id; // ← ambil dari token JWT
  const { id_komentar, balas_komentar } = req.body;

  if (!id_komentar || !balas_komentar) {
    return res
      .status(400)
      .json({
        message: "id_komentar dan balas_komentar wajib diisi",
        ok: false,
      });
  }

  try {
    const [result] = await connection.query(
      "INSERT INTO tb_balas_komentar (id_komentar, balas_komentar, id_user) VALUES (?, ?, ?)",
      [id_komentar, balas_komentar, id_user,], // ← tambah id_user
    );
    res.status(201).json({ message: "success", data: result, ok: true });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

export async function deleteBalasKomentar(req, res) {
  const { id } = req.params;

  try {
    const [balasKomentar] = await connection.query(
      "delete from tb_balas_komentar where id = ?",
      [id],
    );

    res.status(200).json({
      message: "success",
      data: balasKomentar,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}
