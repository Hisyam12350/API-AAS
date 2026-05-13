import connection from "../database.js";

export async function getKomentar(req, res) {
  try {
    const [komentar] = await connection.query(`
            SELECT a.username, b.judul , c.isi_komentar
                from tb_users a
                join tb_laporan b on b.id_user = a.id
                join tb_komentar c on c.id_laporan = b.id;
        `);

    res.status(200).json({
      message: "success",
      data: komentar,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}

export async function createKomentar(req, res) {
  const {id_user, id_laporan, isi_komentar } = req.body;
  try {
    const [komentar] = await connection.query(
      "insert into tb_komentar (id_user, id_laporan, isi_komentar) values (?, ?, ?)",
      [id_user, id_laporan, isi_komentar]
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
    [id]
  );
  res.status(200).json({
    message: "success",
    data: komentar,
    ok: true,
  });
}
