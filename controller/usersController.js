import connection from '../database.js';

export async function getUsers(req, res) {
  // 1. ngequery data users
  const [users] = await connection.query(
    'select id, username, email, password, role from users'
  );

  // 2. ngersponse ke client
  res.status(200).json({
    message: 'success',
    data: users,
    ok: true,
  });
}

export async function createUser(req, res) {
  // 1. ambil data dari body
  const { username, email, password, role } = req.body;

  // 2. masukkan data ke database
  const [user] = await connection.query(
    'insert into users (username, email, password, role) values (?, ?, ?, ?)',
    [username, email, password, role]
  );
  res.status(200).json({
    message: 'success',
    data: user,
    ok: true,
  });
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  const [user] = await connection.query(
    'update users set username = ?, email = ?, password = ?, role = ? where id = ?',
    [username, email, password, role, id]
  );
  res.status(200).json({
    message: 'success',
    data: user,
    ok: true,
  });
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  const [user] = await connection.query('delete from users where id = ?', [id]);
  res.status(200).json({
    message: 'success',
    data: user,
    ok: true,
  });
}
