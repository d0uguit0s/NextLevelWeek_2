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

        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
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

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
}