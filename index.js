const express = require('express');
const path = require('path');

const app=express();//inicializando o express

app.set('view engine', 'ejs');//para configurar o ejs
app.set('views', path.join(__dirname, 'views'));

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

// Rota para adicionar saída
app.get('/adicionar_saida', (req, res) => {
    res.send('Página para adicionar saída');
});

// Rota para adicionar chegada
app.get('/adicionar_chegada', (req, res) => {
    res.send('Página para adicionar chegada');
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