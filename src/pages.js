const dataBase = require('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')

//Fuções das rotas
function pageLanding(req, res) {
    // Utilizando a renderização do nujucks
    return res.render("index.html")
}

async function pageStudy(req, res) {
    // req.query retorna um objeto com todos os dados do formulário que foi requisitado
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time) {
        // Utilizando a renderização do nujucks
        // Com o render é possível enviar objetos para dentro de uma página
        return res.render("study.html", { filters, subjects, weekdays })
    }

    // Converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT class.*, proffy.* FROM proffy
        JOIN class ON (class.proffy_id = proffy.id)
        WHERE EXISTS (
            SELECT class_schedule.* FROM class_schedule
            WHERE class_schedule.class_id = class.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND class.subject = '${filters.subject}';
    `;

    // Caso haja erro na consulta
    try {
        const db = await dataBase
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    // Utilizando a renderização do nujucks
    return res.render("give-classes.html", { weekdays, subjects })
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    // req.query retorna um objeto com todos os dados do formulário que foi requisitado com o método GET
    // const data = req.query

    // req.query retorna um objeto com todos os dados do formulário que foi requisitado com o método POST
    // const data = req.body
    // console.log(data)

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {
        const db = await dataBase
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}