// A palavra async me permite utilizar o await dentro da função
module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // Inserir dados na tabela de proffy
    //O await substitui a função "then()" e espera a linha ser executada completamente antes de prosseguir com a leitura
    const insertedProffy = await db.run(`
        INSERT INTO proffy (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    // Obtendo o id do proffy
    const proffy_id = insertedProffy.lastID;

    // Inserir dados na tabela de class
    const insertedClass = await db.run(`
            INSERT INTO class (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID;

    // Inserir dados na tabela class_schedule
    //Com o map, será possível pegar todos os valores e jogá-los para um array já preparados dentro do "db.run()" para inseri-los em sequência
    const insertedAllClassScheduleValues = classScheduleValues.map((value) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            );
        `)
    })

    // Executando todos os db.run() dentro do insertedAllClassScheduleValues
    // Aqui, o arquivo espera a execução total do Promise.all, que por sua vez, vai percorrer todo o array e executar cada db.run() dentro dele
    await Promise.all(insertedAllClassScheduleValues)
}