const Viagem_ocorrencia = require('../models/viagem_ocorrencia');

exports.adicionarViagem_ocorrencia = async (req, res) => {
  try {
    const { viagem_ID, ocorrencia_ID} = req.body;
    
  
    const novaViagem_ocorrencia = await Viagem_ocorrencia.create({ viagem_ID, ocorrencia_ID });
    
    res.status(201).json({ message: 'Viagem_ocorrencia (tabela intermediária de n:n) adicionada com sucesso', viagem: novaViagem_ocorrencia });
  } catch (error) {
    console.error('Erro ao adicionar viagem_ocorrencia(tabela intermediária de n:n):', error);
    res.status(500).json({ message: 'Erro ao adicionar viagem_ocorrencia(tabela intermediária de n:n)' });
  }
};

exports.listarViagem_ocorrencia = async (req, res) => {
  try {
      const viagem_ocorrencia = await Viagem_ocorrencia.findAll();
      res.status(200).json(viagem_ocorrencia);
  } catch (error) {
      console.error('Erro ao listar viagem_ocorrencia (tabela intermediária n:n):', error);
      res.status(500).json({ message: 'Erro ao listar viagem_ocorrencia (tabela intermediária n:n)' });
  }
};

exports.buscarViagem_ocorrenciaPorID = async (req, res) => {
  try {
      const viagem_ocorrencia = await Viagem_ocorrencia.findByPk(req.params.id);
      if (viagem_ocorrencia) {
          res.status(200).json(viagem_ocorrencia);
      } else {
          res.status(404).json({ message: 'Viagem_ocorrencia (tabela intermediária n:n) não encontrada' });
      }
  } catch (error) {
      console.error('Erro ao buscar viagem_ocorrencia (tabela intermediária n:n):', error);
      res.status(500).json({ message: 'Erro ao buscar viagem_ocorrencia (tabela intermediária n:n)' });
  }
};