const express = require('express')
const app = express()
const { rotas } = require('./routes/routes')
const porta = 3000


app.use(express.json())
app.use(rotas)

app.listen(porta, ()=>  console.log(`API rodando na porta ${porta}`))