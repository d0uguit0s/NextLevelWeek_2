const dataBase = require('sqlite-async')

function execute(db) {
    // Criação das tabelas do bd
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffy (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS class (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

// Abrindo o banco de dados para usá-lo
// Como o bd demora um tempo para iniciar e o JS lê o documento mais rápido, ele pode acabar executando comandos do próprio banco sem que ele esteja iniciado ainda, a fim de evitar isto, a função "then()" ocorre apenas depois do banco ser iniciado completamente e ela chama uma função.
module.exports = dataBase.open(__dirname + '/database.sqlite').then(execute)