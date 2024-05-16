const Usuario = require('../models/usuarios');

exports.adicionarUsuario = async (req, res) => {
  try {
    const { nome, tipo_Usuario, setor_ID, login, senha } = req.body;
    
  
    const novoUsuario = await Usuario.create({ nome, tipo_Usuario, setor_ID, login, senha });
    
    res.status(201).json({ message: 'Usuario adicionado com sucesso', usuario: novoUsuario });
  } catch (error) {
    console.error('Erro ao adicionar usuario:', error);
    res.status(500).json({ message: 'Erro ao adicionar usuario' });
  }
};