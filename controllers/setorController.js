const Setor = require('../models/setor');

//POST
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

//GET ALL
exports.listarSetor = async (req, res) => {
  try {
      const setor = await Setor.findAll();
      res.status(200).json(setor);
  } catch (error) {
      console.error('Erro ao listar setores:', error);
      res.status(500).json({ message: 'Erro ao listar setores' });
  }
};

//GET por ID
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

// PATCH
exports.editarSetor = async (req, res) => {
  try {
      const { setor_ID } = req.params;
      const atualizacoes = req.body;

      const setor = await Setor.findByPk(setor_ID);

      if (!setor) {
          return res.status(404).json({ message: 'Setor não encontrado' });
      }

      await setor.update(atualizacoes);
      
      res.status(200).json({ message: 'Setor atualizado com sucesso', setor });
  } catch (error) {
      console.error('Erro ao atualizar setor:', error);
      res.status(500).json({ message: 'Erro ao atualizar setor' });
  }
};