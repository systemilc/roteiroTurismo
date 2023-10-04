const express = require('express')
const { cadastrarUsuario } = require('../app/controllers/usersController')
const rotas = express()

rotas.post('/usuario', cadastrarUsuario)

module.exports = {
    rotas 
} 