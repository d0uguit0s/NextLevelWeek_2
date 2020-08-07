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

// FUNCIONALIDADE

function getSubject(subjectNumber) {
    // O simbolo de adição (+) garante que será um número
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

function convertHoursToMinutes(time){
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}