const express = require('express');
const path = require('path');

const app=express();//inicializando o express

app.set('view engine', 'ejs');//para configurar o ejs
app.set('views', path.join(__dirname, 'views'));

// Rota para a página de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Rota para a página "menu"
app.get('/menu', (req, res) => {
    res.render('menu');
});

app.listen(80, ()=>{
    console.log('Working on port 80!')
});