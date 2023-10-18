const express = require("express");
const {
  cadastrarUsuario,
  login,
  editarUsuario,
} = require("../app/controllers/usersController");

const {
  validaCadastro,
  emailSenha,
} = require("../app/intermediary/validadores");
const { authorization } = require("../app/intermediary/auth");

const rotas = express();

rotas.post("/usuario", validaCadastro, cadastrarUsuario);
rotas.post("/entrar", emailSenha, login);
rotas.put("/editar", editarUsuario);

rotas.use(authorization);

module.exports = {
  rotas,
};
