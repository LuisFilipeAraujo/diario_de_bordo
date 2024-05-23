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

exports.listarVeiculo = async (req, res) => {
  try {
      const veiculos = await Veiculo.findAll();
      res.status(200).json(veiculos);
  } catch (error) {
      console.error('Erro ao listar veículos:', error);
      res.status(500).json({ message: 'Erro ao listar veículos' });
  }
};

exports.buscarVeiculoPorID = async (req, res) => {
  try {
      const veiculo = await Veiculo.findByPk(req.params.id);
      if (veiculo) {
          res.status(200).json(veiculo);
      } else {
          res.status(404).json({ message: 'Veículo não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar veículo:', error);
      res.status(500).json({ message: 'Erro ao buscar veículo' });
  }
};