const Viagem = require('../models/viagem');

exports.adicionarViagem = async (req, res) => {
  try {
    const { veiculo_ID, usuario_ID, itinerario, servico, dataSaida, dataChegada, kmSaida, kmChegada} = req.body;
    
  
    const novaViagem = await Viagem.create({ veiculo_ID, usuario_ID, itinerario, servico, dataSaida, dataChegada, kmSaida, kmChegada });
    
    res.status(201).json({ message: 'Viagem adicionada com sucesso', viagem: novaViagem });
  } catch (error) {
    console.error('Erro ao adicionar viagem:', error);
    res.status(500).json({ message: 'Erro ao adicionar viagem' });
  }
};

exports.listarViagem = async (req, res) => {
  try {
      const viagem = await Viagem.findAll();
      res.status(200).json(viagem);
  } catch (error) {
      console.error('Erro ao listar viagens:', error);
      res.status(500).json({ message: 'Erro ao listar viagens' });
  }
};

exports.buscarViagemPorID = async (req, res) => {
  try {
      const viagem = await Viagem.findByPk(req.params.id);
      if (viagem) {
          res.status(200).json(viagem);
      } else {
          res.status(404).json({ message: 'Viagem não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao buscar viagem:', error);
      res.status(500).json({ message: 'Erro ao buscar viagem' });
  }
};