const Setor = require('../models/setor');

exports.adicionarSetor = async (req, res) => {
  try {
    const { nome_setor } = req.body;
    
  
    const novoSetor = await Setor.create({ nome_setor });
    
    res.status(201).json({ message: 'Setor adicionado com sucesso', setor: novoSetor });
  } catch (error) {
    console.error('Erro ao adicionar setor:', error);
    res.status(500).json({ message: 'Erro ao adicionar setor' });
  }
};