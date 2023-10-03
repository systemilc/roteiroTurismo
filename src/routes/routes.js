const express = require('express')
const { cadastrarUsuario } = require('../controllers/users')
const rotas = express()

rotas.post('/usuario', cadastrarUsuario)

module.exports = {
    rotas 
} 