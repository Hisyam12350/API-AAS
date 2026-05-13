import { channel } from "diagnostics_channel";
import connection from "../database.js";

export async function getLaporan(req, res) {
  const [laporan] = await connection.query("select * from tb_laporan");

  res.status(200).json({
    message: "success",
    data: laporan,
    ok: true,
  });
}

export async function createLaporan(req, res) {
  console.log("req.user:", req.user);
  const id_user = req.user.id;

  const { judul, deskripsi, lokasi, kategori_id } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!judul || !image || !deskripsi || !lokasi || !kategori_id) {
    console.log("Validasi Gagal");
    return res.status(400).json({
      message: "judul, gambar, deskripsi, lokasi, kategori_id wajib di isi",
    });
  }
  console.log("Validasi Berhasil");
  try {
    const [users] = await connection.query(
      "select * from tb_users where id = ?",
      [id_user],
    );
    if (users.length === 0) {
      return res.status(400).json({
        message: "user tidak ditemukan",
      });
    }
    const [kategori] = await connection.query(
      "select * from tb_kategori where id = ?",
      [kategori_id],
    );
    if (kategori.length === 0) {
      return res.status(400).json({
        message: "kategori tidak ditemukan",
      });
    }

    const [laporan] = await connection.query(
      "insert into tb_laporan (id_user, judul, gambar, deskripsi, lokasi, kategori_id) values (?, ?, ?, ?, ?, ?)",
      [id_user, judul, image, deskripsi, lokasi, kategori_id],
    );
    res.status(201).json({
      message: "success",
      data: {
        id: laporan.insertId,
        judul,
        gambar: image,
        deskripsi,
        lokasi,
        kategori: kategori[0].nama,
      },
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

export async function getLaporanById(req, res) {
  const { id } = req.params;

  const [laporan] = await connection.query(
    `select a.username, a.email, b.judul, b.id, b.status, b.gambar, b.deskripsi, b.lokasi, b.create_at, c.nama_kategori
        from tb_users a
        join tb_laporan b on b.id_user = a.id
        join tb_kategori c on c.id = b.id where b.id = ?;`,
    [id],
  );

  if (laporan.length === 0) {
    return res.status(404).json({
      message: "laporan tidak ditemukan",
    });
  }

  res.status(200).json({
    message: "success",
    data: laporan,
    ok: true,
  });
}

export async function editStatus(req, res) {
  const id = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "status wajib di isi",
    });
  }

  try {
    const [laporan] = await connection.query(
      "update tb_laporan set status = ? where id = ?",
      [status, id],
    );

    if (laporan.affectedRows === 0) {
      return res.status(404).json({
        message: "laporan tidak ditemukan",
      });
    }

    res.status(200).json({
      message: "success",
      data: laporan,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}

export async function deleteLaporan(req, res) {
  const { id } = req.params;

  const [laporan] = await connection.query(
    "delete from tb_laporan where id = ?",
    [id],
  );

  res.status(200).json({
    message: "success",
    data: { id },
    ok: true,
  });
}

export async function updateLaporan(req, res) {
  const { id } = req.params;
  const { judul, deskripsi, lokasi, kategori_id, status } = req.body;
  const gambar = req.file ? req.file.filename : null;

  try {
    const [cek] = await connection.query(
      "select * from tb_laporan where id = ?",
      [id],
    );
    if (cek.length === 0) {
      return res.status(404).json({
        message: "Laporan tidak ditemukan",
      });
    }

    const gambarBaru = gambar || cek[0].gambar;

    const [laporan] = await connection.query(
      "update tb_laporan set judul = ?, deskripsi = ?, gambar = ?, lokasi = ?, kategori_id = ?, status = ? where id = ?",
      [judul, deskripsi, gambarBaru, lokasi, kategori_id, status, id],
    );  
   
    res.status(200).json({
      message: "success",
      data: laporan,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
}
