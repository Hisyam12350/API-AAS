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

export async function createKategori(req, res) {
  const { nama_kategori } = req.body;

  try {
    const [kategori] = await connection.query(
      "insert into tb_kategori (nama_kategori) values (?)",
      [nama_kategori],
    );

    res.status(201).json({
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

export async function deleteKategori(req, res) {
  const { id } = req.params;

  try {
    await connection.query("delete from tb_kategori where id = ?", [id]);

    res.status(200).json({
      message: "success",
      data: { id },
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

// Admin buat request
export async function createRequest(req, res) {
    const id_user = req.user.id
    const { nama_kategori, alasan } = req.body

    if (!nama_kategori || !alasan) {
        return res.status(400).json({ message: "nama_kategori dan alasan wajib diisi" })
    }

    try {
        const [result] = await connection.query(
            "INSERT INTO tb_request_kategori (id_user, nama_kategori, alasan) VALUES (?, ?, ?)",
            [id_user, nama_kategori, alasan]
        )

        res.status(201).json({ message: "success", data: result, ok: true })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}

// Super admin lihat semua request
export async function getAllRequest(req, res) {
    try {
        const [result] = await connection.query(`
            SELECT r.id, r.nama_kategori, r.alasan, r.status, r.created_at, u.username
            FROM tb_request_kategori r
            JOIN tb_users u ON r.id_user = u.id
            ORDER BY r.created_at DESC
        `)

        res.status(200).json({ message: "success", data: result, ok: true })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}

// Super admin approve/tolak request
export async function updateRequest(req, res) {
    const { id } = req.params
    const { status } = req.body

    if (!["disetujui", "ditolak"].includes(status)) {
        return res.status(400).json({ message: "status tidak valid" })
    }

    try {
        // Ambil data request
        const [request] = await connection.query(
            "SELECT * FROM tb_request_kategori WHERE id = ?", [id]
        )

        if (request.length === 0) {
            return res.status(404).json({ message: "request tidak ditemukan" })
        }

        // Update status request
        await connection.query(
            "UPDATE tb_request_kategori SET status = ? WHERE id = ?",
            [status, id]
        )

        // Kalau disetujui → tambahkan ke tabel kategori
        if (status === "disetujui") {
            await connection.query(
                "INSERT INTO tb_kategori (nama_kategori) VALUES (?)",
                [request[0].nama_kategori]
            )
        }

        res.status(200).json({ message: "success", ok: true })
    } catch (error) {
        res.status(500).json({ message: "server error", error: error.message })
    }
}