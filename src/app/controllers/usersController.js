const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const senhaSegura = require("../../senhajwt");

const {
  procurarIdUsuarioPorEmail,
  insertUser,
  encontrarUsuarioEmail,
  encontrarUsuarioId,
  procurarIdUsuarioPorEmailId,
  atualizarUsuario,
} = require("../functions/functions");
const mensagens = require("../messages/messages");

cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const emailExistente = await procurarIdUsuarioPorEmail(email);

    if (emailExistente > 0) {
      return res
        .status(400)
        .json({ mensagem: mensagens.emailOuSenhaInvalidos });
    }

    const cadastro = await insertUser(nome, email, senha);
    delete cadastro.id;
    delete cadastro.senha;
    return res.status(201).json(cadastro);
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(500).json({ mensagem: mensagens.erroInterno });
  }
};

login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuarioEncontrado = await encontrarUsuarioEmail(email);

    if (!usuarioEncontrado) {
      return res.status(404).json({ mensagem: mensagens.usuarioNaoEncontrado });
    }

    const senhaValida = await bcrypt.compare(senha, usuarioEncontrado.senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Email ou senha inválida" });
    }

    const token = jwt.sign({ id: usuarioEncontrado.id }, senhaSegura, {
      expiresIn: "2h",
    });

    const { senha: _, ...usuLogado } = usuarioEncontrado;

    return res.json({ usuario: usuLogado, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

editarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const autorizacao = req.headers.authorization;

  if (!autorizacao) {
    return res.status(401).json({ mensagem: mensagens.naoLogado });
  }

  try {
    const token = autorizacao.split(" ")[1];
    const { id: usuariLogadoId } = jwt.verify(token, senhaSegura);

    const usuarioEncontrado = await encontrarUsuarioId(usuariLogadoId);

    if (usuarioEncontrado === 0) {
      return res.status(404).json({ mensagem: mensagens.usuarioNaoEncontrado });
    }

    const usuario = await procurarIdUsuarioPorEmailId(email, usuariLogadoId);

    if (usuario > 0) {
      return res.status(400).json({ mensagem: mensagens.emailEmUso });
    }

    await atualizarUsuario(nome, email, senha, usuariLogadoId);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: mensagens.naoAutorizado });
  }
};

module.exports = {
  cadastrarUsuario,
  login,
  editarUsuario,
};
