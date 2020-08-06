// DADOS
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "11999346984",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20,00",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Daniele Evangelista",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "11955895688",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20,00",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "11955895688",
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20,00",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciencias",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

// FUNCIONALIDADES

function getSubject(subjectNumber) {
    // O simbolo de adição (+) garante que será um número
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

//Fuções das rotas
function pageLanding(req, res) {
    // Utilizando a renderização do nujucks
    return res.render("index.html")
}
function pageStudy(req, res) {
    // req.query retorna um objeto com todos os dados do formulário que foi requisitado
    const filters = req.query

    // Utilizando a renderização do nujucks
    // Com o render é possível enviar objetos para dentro de uma página
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}
function pageGiveClasses(req, res) {
    // req.query retorna um objeto com todos os dados do formulário que foi requisitado
    const data = req.query
    console.log(data)

    // Transformando a constante data em um array
    const isNotEmpty = Object.keys(data).length != 0

    // Verficando se os dados foram preenchidos
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
        // Adicionar dados na lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }

    // Utilizando a renderização do nujucks
    return res.render("give-classes.html", { weekdays, subjects })
}

// SERVIDOR
const express = require('express')
const server = express()

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
// Apontando a pasta em que todos os arquivos estáticos se encontram
.use(express.static("public"))

// Configurando as rotas da aplicação
// Quando eu pedir uma barra (/) na url ele terá que me retornar o index.html
.get("/", pageLanding)
// Quando eu pedir study (/study) na url ele terá que me retornar o study.html
.get("/study", pageStudy)
// Quando eu pedir give-classes (/give-classes) na url ele terá que me retornar o give-classes.html
.get("/give-classes", pageGiveClasses)
// Start do servidor em uma porta
.listen(5500)