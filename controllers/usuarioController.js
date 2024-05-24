const Usuario = require('../models/usuarios');

//POST
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

//GET ALL
exports.listarUsuario = async (req, res) => {
  try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
  } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

//GET por ID
exports.buscarUsuarioPorID = async (req, res) => {
  try {
      const usuarios = await Usuario.findByPk(req.params.id);
      if (usuarios) {
          res.status(200).json(usuarios);
      } else {
          res.status(404).json({ message: 'Usuário não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};


// PATCH
exports.editarUsuario = async (req, res) => {
  try {
      const { usuario_ID } = req.params;
      const atualizacoes = req.body;

      const usuarios = await Usuario.findByPk(usuario_ID);

      if (!usuarios) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await usuarios.update(atualizacoes);
      
      res.status(200).json({ message: 'Usuário atualizado com sucesso', usuarios });
  } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};