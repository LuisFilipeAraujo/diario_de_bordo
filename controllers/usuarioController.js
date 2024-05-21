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

exports.listarUsuario = async (req, res) => {
  try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
  } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};