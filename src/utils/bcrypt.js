const bcrypt = require('bcrypt');

const criptografiaSenha = async (senha) =>{
    const senhaCriptografada =  await bcrypt.hash(senha, 10, )
    return senhaCriptografada

}

module.exports = criptografiaSenha