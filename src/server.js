const express = require('express')

const server = express()

server
// Tudo que for .use será uma configuração do servidor
// Apontando a pasta em que todos os arquivos estáticos se encontram
.use(express.static("public"))

// Configurando as rotas da aplicação
// Quando eu pedir uma barra (/) na url ele terá que me retornar o index.html
.get("/", (req, res) => {
    // O __dirname retorna o caminho até a pasta src
    return res.sendFile(__dirname + "/views/index.html")
})
// Quando eu pedir uma barra (/study) na url ele terá que me retornar o study.html
.get("/study", (req, res) => {
    return res.sendFile(__dirname + "/views/study.html")
})
// Quando eu pedir uma barra (/give-classes) na url ele terá que me retornar o give-classes.html
.get("/give-classes", (req, res) => {
    return res.sendFile(__dirname + "/views/give-classes.html")
})
// Porta do server
.listen(5500)