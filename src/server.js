// SERVIDOR
const express = require('express')
const server = express()

const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

// Configurando o nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    // Apontando para o servidor utilizado
    express: server,
    noCache: true
})

// Inciando e configurando o servidor
server
// Tudo que for .use será uma configuração do servidor

// Receber os dados do req.body
.use(express.urlencoded({ extended: true }))

// Apontando a pasta em que todos os arquivos estáticos se encontram
.use(express.static("public"))

// Configurando as rotas da aplicação
// Quando eu pedir uma barra (/) na url ele terá que me retornar o index.html
.get("/", pageLanding)
// Quando eu pedir study (/study) na url ele terá que me retornar o study.html
.get("/study", pageStudy)
// Quando eu pedir give-classes (/give-classes) na url ele terá que me retornar o give-classes.html
.get("/give-classes", pageGiveClasses)

.post("/save-classes", saveClasses)
// Start do servidor em uma porta
.listen(5500)