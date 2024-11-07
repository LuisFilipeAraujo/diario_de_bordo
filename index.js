const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const usuarioRoutes = require('./routes/usuarioRoutes');
const veiculoRoutes = require('./routes/veiculoRoutes');
const viagemRoutes = require('./routes/viagemRoutes');
const ocorrenciaRoutes = require('./routes/ocorrenciaRoutes');
const setorRoutes = require('./routes/setorRoutes');
const viagem_ocorrenciaRoutes = require('./routes/viagem_ocorrenciaRoutes');

const loginController = require('./controllers/loginController');
const viagemController = require('./controllers/viagemController');
const usuarioController = require('./controllers/usuarioController');
const veiculoController = require('./controllers/veiculoController');
const session = require('express-session');
require('dotenv').config();


const app=express();//inicializando o express

app.set('view engine', 'ejs');//para configurar o ejs
app.set('views', path.join(__dirname, 'views'));

// middleware body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // false em desenvolvimento
}));

// middleware para verificar a sessão em cada requisição
app.use((req, res, next) => {
    console.log('Sessão atual:', req.session);
    next();
});
// Middleware para definir o usuário em todas as views
app.use((req, res, next) => {
    if (req.session && req.session.user) {
        res.locals.user = req.session.user;
    } else {
        res.locals.user = null;
    }
    next();
});

app.get('/', (req, res) => {
    res.render('login');
});

app.use('/usuarios', usuarioRoutes); // Rotas de usuários
app.use('/veiculo', veiculoRoutes); // Rotas de veículos
app.use('/viagem', viagemRoutes); // Rotas de viagens
app.use('/ocorrencia', ocorrenciaRoutes); // Rotas de ocorrencia
app.use('/setor', setorRoutes); // Rotas de setor
app.use('/viagem_ocorrencia', viagem_ocorrenciaRoutes); // Rotas de viagem_ocorrencia (tabela intermediária n:n)

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

// Rota para a página "criar-motorista"
app.get('/motoristas/criar-motorista', usuarioController.renderizarCriarMotorista);

// Rota para a página "criar-veiculo"
app.get('/veiculos/criar-veiculos', veiculoController.renderizarCriarVeiculo);

// Rota para a página adicionar-saida - mostrar credenciais na tela do form de adicionar saida
app.get('/viagens/adicionar-saida', loginController.exibeCredenciais); // Atualizada

// Rota para a página adicionar-chegada
app.get('/viagens/adicionar-chegada', (req, res) => {
    res.render('viagens/adicionar-chegada');
});

//Rota para fazer autenticação de usuários
app.post('/login', loginController.login);

//Rota para mostrar credenciais na tela do form de adicionar saida
app.get('/viagens/historico', viagemController.listarViagem);


app.listen(80, ()=>{
    console.log('Working on port 80!')
});