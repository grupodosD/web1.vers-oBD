const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Configuração do middleware
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'HotelM'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL conectado...');
});

// Rota para verificar login
app.post('/login', (req, res) => {
    const { nome, senha } = req.body;

    const query = `
        SELECT * FROM Cliente 
        WHERE Nome = ? AND AES_DECRYPT(Senha, UNHEX('526F79616C506C616365000000000000')) = ?`;
    
    db.query(query, [nome, senha], (err, results) => {
        if (err) {
            console.error('Erro no banco de dados:', err);
            return res.status(500).send('Erro no servidor.');
        }

        if (results.length > 0) {
            res.status(200).send('Login bem-sucedido!');
        } else {
            res.status(401).send('Nome de usuário ou senha inválidos.');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
