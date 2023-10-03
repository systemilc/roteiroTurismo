const { procurarUsuarioPorEmail } = require("../functions/functions");

const cadastrarUsuario = (req, res)=>{
    const {nome, email, senha} = req.body;

    if(!nome || !email || !senha){
       return res.status(400).json({mensagem: "Todos os campos são obrigatórios"});
    };

    const emailExistente = procurarUsuarioPorEmail(email);

    if(emailExistente){
        return res.status(400).json({mensagem: "E-mail ou Senha Inválido"});
    }

    return res.status(200).json({mensagem: 'Entrei na rota GET'});
}

module.exports = {
    cadastrarUsuario
}