import connection from "../database.js";

export async function getKategori(req, res) {
  try {
    const [kategori] = await connection.query("select * from tb_kategori");

    res.status(200).json({
      message: "success",
      data: kategori,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

