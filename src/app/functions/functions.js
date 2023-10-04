const criptografiaSenha = require("../../utils/bcrypt");
const pool = require("../config/database");

const procurarUsuarioPorEmail = async (email) => {
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

    const senhaCriptografada = await criptografiaSenha(senha)

    const value = [nome, email, senhaCriptografada];
    const result = await pool.query(query, value);
    return result.rows[0];
}

module.exports = {
    procurarUsuarioPorEmail,
    insertUser
}
