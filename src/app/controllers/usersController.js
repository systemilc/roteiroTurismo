const { procurarUsuarioPorEmail, insertUser } = require("../functions/functions");
const mensagens = require("../messages/messages");

cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        if (!nome || !email || !senha) {
            return res.status(400).json({ mensagem: mensagens.todosOsCamposObrigatorios });
        }

        const emailExistente = await procurarUsuarioPorEmail(email);

        if (emailExistente > 0) {
            return res.status(400).json({ mensagem: mensagens.emailOuSenhaInvalidos });
        }

        const cadastro = await insertUser(nome, email, senha);
        delete cadastro.id;
        delete cadastro.senha;
        return res.status(201).json(cadastro);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: mensagens.erroInterno });
    }
}


module.exports = {
    cadastrarUsuario
}