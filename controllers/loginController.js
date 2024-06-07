const Usuario = require('../models/usuarios');
const Veiculo = require('../models/veiculo');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificando as credenciais do usuário
        const usuario = await Usuario.findOne({ where: { login: username, senha: password } });

        if (!usuario) {
            return res.status(401).send('Credenciais inválidas');
        }
        req.session.user = usuario.toJSON();
        // Redirecionando com base no tipo de usuário
        if (usuario.tipo_Usuario === 'motorista') {
            return res.render('motoristas/menu-motorista', { user: usuario.toJSON() });
        } else if (usuario.tipo_Usuario === 'administrador' || usuario.tipo_Usuario === 'administrador geral') {
            return res.render('motoristas/menu-adm', { user: usuario.toJSON() });
        } else {
            return res.status(403).send('Tipo de usuário desconhecido');
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).send('Erro ao autenticar usuário');
    }
};

//GET para exibir credenciais
exports.exibeCredenciais = async (req, res) => {
    try {
        const usuario = req.session.user;
        if (!usuario) {
            return res.redirect('/login');
        }
        // Buscar todos os veículos
        const veiculos = await Veiculo.findAll();

        res.render('viagens/adicionar-saida', { user: usuario, veiculos: veiculos });
    } catch (error) {
        console.error('Erro ao exibir credenciais:', error);
        res.status(500).send('Erro ao exibir credenciais');
    }
};

//GET para encerrar sessão
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar sessão:', err);
            return res.status(500).send('Erro ao encerrar sessão');
        }
        res.redirect('/login');
    });
};