const { pool } = require("../config/database")

const procurarUsuarioPorEmail = async (email)=>{
    const texto =  `SELECT id FROM usuarios WHERE email = $1;`
    const valores = [email]
    const resposta = await pool.query(texto, valores)
    console.log(resposta.rows[0])
    return resposta.rows[0]
}

module.exports = {
    procurarUsuarioPorEmail
}