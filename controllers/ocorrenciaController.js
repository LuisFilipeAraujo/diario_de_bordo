const Ocorrencia = require('../models/ocorrencia');

//POST
exports.adicionarOcorrencia = async (req, res) => {
  try {
    const { assunto, envolvidos } = req.body;
    
  
    const novaOcorrencia = await Ocorrencia.create({ assunto, envolvidos });
    
    res.status(201).json({ message: 'Ocorrencia adicionada com sucesso', ocorrencia: novaOcorrencia });
  } catch (error) {
    console.error('Erro ao adicionar ocorrencia:', error);
    res.status(500).json({ message: 'Erro ao adicionar Ocorrencia' });
  }
};

//GET ALL
exports.listarOcorrencia = async (req, res) => {
  try {
      const ocorrencia = await Ocorrencia.findAll();
      res.status(200).json(ocorrencia);
  } catch (error) {
      console.error('Erro ao listar ocorrências:', error);
      res.status(500).json({ message: 'Erro ao listar ocorrências' });
  }
};

//GET por ID
exports.buscarOcorrenciaPorID = async (req, res) => {
  try {
      const ocorrencia = await Ocorrencia.findByPk(req.params.id);
      if (ocorrencia) {
          res.status(200).json(ocorrencia);
      } else {
          res.status(404).json({ message: 'Ocorrência não encontrada' });
      }
  } catch (error) {
      console.error('Erro ao buscar ocorrência:', error);
      res.status(500).json({ message: 'Erro ao buscar ocorrência' });
  }
};

// PATCH
exports.editarOcorrencia = async (req, res) => {
  try {
      const { ocorrencia_ID } = req.params;
      const atualizacoes = req.body;

      const ocorrencia = await Ocorrencia.findByPk(ocorrencia_ID);

      if (!ocorrencia) {
          return res.status(404).json({ message: 'Ocorrência não encontrada' });
      }

      await ocorrencia.update(atualizacoes);
      
      res.status(200).json({ message: 'Ocorrência atualizada com sucesso', ocorrencia });
  } catch (error) {
      console.error('Erro ao atualizar ocorrência:', error);
      res.status(500).json({ message: 'Erro ao atualizar ocorrência' });
  }
};