const Viagem = require('../models/viagem');

//POST
exports.adicionarViagem = async (req, res) => {
  try {
    const { veiculo_ID, usuario_ID, itinerario, servico, dataSaida, dataChegada, kmSaida, kmChegada} = req.body;
    
    // Verificar campos obrigatórios
    if (!veiculo_ID || !usuario_ID || !itinerario || !servico || !dataSaida || !kmSaida) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }
    const novaViagem = await Viagem.create({ veiculo_ID, usuario_ID, itinerario, servico, dataSaida, dataChegada, kmSaida, kmChegada });
    
    /*// Salvar dados em cookies
    res.cookie('itinerario', itinerario);
    res.cookie('servico', servico);
    res.cookie('kmInicial', kmSaida);
    res.cookie('dataHoraSaida', dataSaida);*/

    res.status(201).json({ message: 'Viagem adicionada com sucesso', viagem: novaViagem });
  } catch (error) {
    console.error('Erro ao adicionar viagem:', error);
    res.status(500).json({ message: 'Erro ao adicionar viagem' });
  }
};

//GET ALL
exports.listarViagem = async (req, res) => {
  try {
      const viagem = await Viagem.findAll();
      res.status(200).json(viagem);
  } catch (error) {
      console.error('Erro ao listar viagens:', error);
      res.status(500).json({ message: 'Erro ao listar viagens' });
  }
};

//GET por ID
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

// PATCH
exports.editarViagem = async (req, res) => {
  try {
      const { viagem_ID } = req.params;
      const atualizacoes = req.body;

      const viagem = await Viagem.findByPk(viagem_ID);

      if (!viagem) {
          return res.status(404).json({ message: 'Viagem não encontrada' });
      }

      await viagem.update(atualizacoes);
      
      res.status(200).json({ message: 'Viagem atualizada com sucesso', viagem });
  } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
      res.status(500).json({ message: 'Erro ao atualizar viagem' });
  }
};