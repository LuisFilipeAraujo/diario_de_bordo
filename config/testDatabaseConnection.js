const sequelize = require('./database'); //

async function testDatabaseConnection() {
    try {
        // Testando conexao com o banco de dados
        await sequelize.authenticate();
        console.log('Conexão bem-sucedida com o banco de dados.');

        // consulta teste na tabela usuarios
        const resultado = await sequelize.query('SELECT * FROM usuarios LIMIT 5;');
        console.log('Linhas recuperadas do banco de dados:');
        console.log(resultado[0]); 

        // consulta teste na tabela ocorrencia
        const resultado2 = await sequelize.query('SELECT * FROM ocorrencia;');
        console.log('Linhas recuperadas do banco de dados na tabela ocorrencia:');
        console.log(resultado2[0]); 

        // Fecha a conexão com o banco de dados
        await sequelize.close();
        console.log('Conexão com o banco de dados encerrada.');
    } catch (error) {
        console.error('Erro ao conectar-se ao banco de dados:', error);
    }
}


testDatabaseConnection();
