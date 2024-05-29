const Usuario = require('../models/usuarios');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificando as credenciais do usuário
        const usuario = await Usuario.findOne({ where: { login: username, senha: password } });

        if (!usuario) {
            return res.status(401).send('Credenciais inválidas');
        }

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
