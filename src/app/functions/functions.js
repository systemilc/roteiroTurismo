const criptografiaSenha = require("../../utils/bcrypt");
const pool = require("../config/database");

const procurarIdUsuarioPorEmail = async (email) => {
  const query = `SELECT id FROM usuarios WHERE email = $1;`;
  const value = [email];
  const result = await pool.query(query, value);
  return result.rowCount;
};

const insertUser = async (nome, email, senha) => {
  const query = `
    INSERT INTO
    usuarios (nome, email, senha)
    VALUES
    ($1, $2, $3)
    RETURNING *`;

  const senhaCriptografada = await criptografiaSenha(senha);

  const value = [nome, email, senhaCriptografada];
  const result = await pool.query(query, value);
  return result.rows[0];
};

const encontrarUsuarioEmail = async (email) => {
  const query = `
    SELECT *
    FROM usuarios
    WHERE email = $1`;

  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const procurarIdUsuarioPorEmailId = async (email, id) => {
  const query = `SELECT id FROM usuarios WHERE email = $1 AND id <> $2;`;
  const value = [email, id];
  const result = await pool.query(query, value);
  return result.rowCount;
};

const encontrarUsuarioId = async (id) => {
  const query = `
    SELECT *
    FROM usuarios
    WHERE id = $1`;

  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const atualizarUsuario = async (nome, email, senha, id) => {
  const query = `
  UPDATE usuarios
  SET nome = $1, email = $2, senha = $3
  WHERE id = $4`;

  const senhaCriptografada = await criptografiaSenha(senha);

  const value = [nome, email, senhaCriptografada, id];
  const result = await pool.query(query, value);
  return result.rows[0];
};

module.exports = {
  procurarIdUsuarioPorEmail,
  insertUser,
  encontrarUsuarioEmail,
  encontrarUsuarioId,
  procurarIdUsuarioPorEmailId,
  atualizarUsuario,
};
