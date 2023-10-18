const { naoAutorizado } = require("../messages/messages");
const { jwt } = require("jsonwebtoken");
const senhajwt = require("../../senhajwt");
const { encontrarUsuarioId } = require("../functions/functions");

const authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ mensagem: naoAutorizado });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, senhajwt);
    const { rows, rowCount } = await encontrarUsuarioId(id);
    if (rowCount === 0) {
      res.status(401).json({ mensagem: naoAutorizado });
    }

    const { senha, ...usuario } = rows[0];
    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(401).json({ mensagem: naoAutorizado });
  }
};

module.exports = {
  authorization,
};
