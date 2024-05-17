const Ocorrencia = require('../models/ocorrencia');

exports.adicionarUsuario = async (req, res) => {
  try {
    const { assunto, envolvidos } = req.body;
    
  
    const novaOcorrencia = await Ocorrencia.create({ assunto, envolvidos });
    
    res.status(201).json({ message: 'Ocorrencia adicionada com sucesso', usuario: novaOcorrencia });
  } catch (error) {
    console.error('Erro ao adicionar ocorrencia:', error);
    res.status(500).json({ message: 'Erro ao adicionar Ocorrencia' });
  }
};