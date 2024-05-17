const Veiculo = require('../models/veiculo');

exports.adicionarVeiculo = async (req, res) => {
  try {
    const { marca, modelo, placa, setor_ID } = req.body;

    const novoVeiculo = await Veiculo.create({ marca, modelo, placa, setor_ID });

    res.status(201).json({ message: 'Veículo adicionado com sucesso', veiculo: novoVeiculo });
  } catch (error) {
    console.error('Erro ao adicionar veículo:', error);
    res.status(500).json({ message: 'Erro ao adicionar veículo' });
  }
};