const express = require('express');
const path = require('path');

const usuarioController = require('./controllers/usuarioController');

const app=express();//inicializando o express

app.set('view engine', 'ejs');//para configurar o ejs
app.set('views', path.join(__dirname, 'views'));


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
app.get('/menuMotorista', (req, res) => {
    res.render('menuMotorista');
});

// Rota para a página "menu" do Adm
app.get('/menuAdm', (req, res) => {
    res.render('menuAdm');
});

// Rota para a página "gerenciar_veiculos"
app.get('/gerenciar_veiculos', (req, res) => {
    res.render('gerenciar_veiculos');
});

// Rota para a página "gerenciar_motoristas"
app.get('/gerenciar_motoristas', (req, res) => {
    res.render('gerenciar_motoristas');
});

// Rota para a página "historico" do Adm
app.get('/historico', (req, res) => {
    res.render('historico');
});

// Rota para a página adicionar_saida
app.get('/adicionar_saida', (req, res) => {
    res.render('adicionar_saida');
});

// Rota para a página adicionar_chegada
app.get('/adicionar_chegada', (req, res) => {
    res.render('adicionar_chegada');
});


app.post('/login', (req, res) => {
    // Ainda precisa adicionar as credenciais de login e valida-las
    // Se as credenciais estiverem corretas, 
    // redireciona para a página de menu do motorista ou menu Adm(no momento só menuMotorista rs)
    res.redirect('/menuMotorista');
});



app.listen(80, ()=>{
    console.log('Working on port 80!')
});