import connection from "../database.js";

export async function getBalasKomentar(req, res) {
  try {
    const [balasKomentar] = await connection.query(
      "select a.id, b.balas_komentar from tb_komentar a join tb_balas_komentar b on a.id = b.id",
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
  const { id_komentar, balas_komentar } = req.body;

  try {
    const [balasKomentar] = await connection.query(
      "insert into tb_balas_komentar (id_komentar, balas_komentar) values (?, ?)",
      [id_komentar, balas_komentar],
    );

    res.status(201).json({
      message: "success",
      data: balasKomentar,
      ok: true,
    });
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
