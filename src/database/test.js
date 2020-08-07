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

    // Todos os Proffys
    const selectedProffys = await db.all("SELECT * FROM proffy")
    // console.log(selectedProffys)

    // Consultar as classes de um determinado professor e trazer junto, os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT class.*, proffy.* FROM proffy
        JOIN class ON (class.proffy_id = proffy.id)
        WHERE class.proffy_id = 1;
    `)
    //console.log(selectClassesAndProffys)

    // Consultar o horário
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.* FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = 0
        AND class_schedule.time_from <= 520
        AND class_schedule.time_to > 520
    `)

    // console.log(selectClassesSchedules)
})