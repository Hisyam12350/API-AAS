import connection from "../database.js";

export async function getKomentar(req, res) {
  const { id_laporan } = req.params;

  try {
    const [komentar] = await connection.query(
      `SELECT c.id, c.id_user, a.username, a.fotoProfile, c.isi_komentar, c.create_at
       FROM tb_users a
       JOIN tb_komentar c ON c.id_user = a.id
       WHERE c.id_laporan = ?`,
      [id_laporan],
    );

    // Tambahkan ini — fetch balasan untuk setiap komentar
    for (const item of komentar) {
      const [balasan] = await connection.query(
        `SELECT b.id, b.balas_komentar, u.username
         FROM tb_balas_komentar b
         JOIN tb_users u ON b.id_user = u.id
         WHERE b.id_komentar = ?`,
        [item.id],
      );
      item.balasan = balasan;
    }

    res.status(200).json({ message: "success", data: komentar, ok: true });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

export async function createKomentar(req, res) {
  const id_user = req.user.id;
  const { id_laporan, isi_komentar } = req.body;

  try {
    const [komentar] = await connection.query(
      "insert into tb_komentar (id_user, id_laporan, isi_komentar) values (?, ?, ?)",
      [id_user, id_laporan, isi_komentar],
    );
    res.status(201).json({
      message: "success",
      data: komentar,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

export async function deleteKomentar(req, res) {
  const { id } = req.params;

  const [komentar] = await connection.query(
    "delete from tb_komentar where id = ?",
    [id],
  );
  res.status(200).json({
    message: "success",
    data: komentar,
    ok: true,
  });
}
