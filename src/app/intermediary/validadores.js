const validaCadastro = (req, res, next) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: mensagens.todosOsCamposObrigatorios });
  }
  next();
};

const emailSenha = (req, res, next) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ mensagem: mensagens.emailSenha });
  }
  next();
};

module.exports = {
  validaCadastro,
  emailSenha,
};
