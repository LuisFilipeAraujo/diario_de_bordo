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

exports.listarSetor = async (req, res) => {
  try {
      const setor = await Setor.findAll();
      res.status(200).json(setor);
  } catch (error) {
      console.error('Erro ao listar setores:', error);
      res.status(500).json({ message: 'Erro ao listar setores' });
  }
};

exports.buscarSetorPorID = async (req, res) => {
  try {
      const setor = await Setor.findByPk(req.params.id);
      if (setor) {
          res.status(200).json(setor);
      } else {
          res.status(404).json({ message: 'Setor não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar setor:', error);
      res.status(500).json({ message: 'Erro ao buscar setor' });
  }
};