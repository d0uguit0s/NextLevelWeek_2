const dataBase = require('./db')
const createProffy = require('./createProffy')

dataBase.then(async (db) => {
    // Inserir dados
    proffyValue = {
        name: 'Douglas Silva',
        avatar: 'https://avatars3.githubusercontent.com/u/52518776?s=460&u=1d8c48d9285bf84bfefbb037a32b818b9af97ebd&v=4',
        whatsapp: '11999225678',
        bio: "Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: 'Química',
        cost: '20'
        // O proffy id virá pelo bd
    }

    classScheduleValues = [
        // class-id virá pelo bd
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos
})