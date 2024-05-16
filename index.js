const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes');

const usuarioController = require('./controllers/usuarioController');

const app=express();//inicializando o express

app.set('view engine', 'ejs');//para configurar o ejs
app.set('views', path.join(__dirname, 'views'));

// middleware body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login');
});

// Rota para adicionar um novo usuário
app.post('/usuarios', usuarioController.adicionarUsuario);

// Rota para a página de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Rota para a página "menu" do motorista
app.get('/motoristas/menu-motorista', (req, res) => {
    res.render('motoristas/menu-motorista');
});

// Rota para a página "menu" do Adm
app.get('/motoristas/menu-adm', (req, res) => {
    res.render('motoristas/menu-adm');
});

// Rota para a página "gerenciar-veiculos"
app.get('/veiculos/gerenciar-veiculos', (req, res) => {
    res.render('veiculos/gerenciar-veiculos');
});

// Rota para a página "gerenciar-motoristas"
app.get('/motoristas/gerenciar-motoristas', (req, res) => {
    res.render('motoristas/gerenciar-motoristas');
});

// Rota para a página "historico" do Adm
app.get('/viagens/historico', (req, res) => {
    res.render('viagens/historico');
});

// Rota para a página adicionar-saida
app.get('/viagens/adicionar-saida', (req, res) => {
    res.render('viagens/adicionar-saida');
});

// Rota para a página adicionar-chegada
app.get('/viagens/adicionar-chegada', (req, res) => {
    res.render('viagens/adicionar-chegada');
});


app.post('/login', (req, res) => {
    // Ainda precisa adicionar as credenciais de login e valida-las
    // Se as credenciais estiverem corretas, 
    // redireciona para a página de menu do motorista ou menu Adm(no momento só menuMotorista rs)
    res.redirect('motoristas/menu-motorista');
});



app.listen(80, ()=>{
    console.log('Working on port 80!')
});