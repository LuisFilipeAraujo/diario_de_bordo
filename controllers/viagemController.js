const Viagem = require('../models/viagem');

//POST
exports.adicionarSaida = async (req, res) => {
  try {
    const { veiculo_ID, usuario_ID, itinerario, servico, dataSaida, dataChegada, kmSaida, kmChegada} = req.body;
    
    // Verificar campos obrigatórios
    if (!veiculo_ID || !usuario_ID || !itinerario || !servico || !dataSaida || !kmSaida) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }
   // const novaViagem = await Viagem.create({ veiculo_ID, usuario_ID, itinerario, servico, dataSaida, dataChegada, kmSaida, kmChegada });
   
    // Validar o formato da data e hora
    const dataSaidaValida = new Date(dataSaida);
    if (isNaN(dataSaidaValida)) {
        return res.status(400).json({ message: 'Data e hora de saída inválidas.' });
    }
   // Salvar dados em cookies
   res.cookie('veiculo_ID', veiculo_ID, { path: '/' });
   res.cookie('itinerario', itinerario, { path: '/' });
   res.cookie('servico', servico, { path: '/' });
   res.cookie('kmSaida', kmSaida, { path: '/' });
   res.cookie('dataSaida', dataSaida, { path: '/' });
   res.cookie('usuario_ID', usuario_ID, { path: '/' });

    //res.status(201).json({ message: 'Viagem adicionada com sucesso', viagem: novaViagem });
  } catch (error) {
    console.error('Erro ao adicionar viagem:', error);
    res.status(500).json({ message: 'Erro ao adicionar viagem' });
  }
};

// POST para Adicionar detalhes da chegada e salvar a viagem no banco de dados
exports.adicionarChegada = async (req, res) => {
    try {
        const { kmChegada, dataChegada } = req.body;

        // Recuperar dados dos cookies
        const veiculo_ID = req.cookies.veiculo_ID;
        const itinerario = req.cookies.itinerario;
        const servico = req.cookies.servico;
        const kmSaida = req.cookies.kmSaida;
        const dataSaida = req.cookies.dataSaida;
        const usuario_ID = req.cookies.usuario_ID;

        // Verificar campos obrigatórios
        if (!veiculo_ID || !usuario_ID || !itinerario || !servico || !dataSaida || !kmSaida || !kmChegada || !dataChegada) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
        }

        // Criar nova viagem com os dados combinados
        const novaViagem = await Viagem.create({
            veiculo_ID,
            usuario_ID,
            itinerario,
            servico,
            dataSaida,
            kmSaida,
            dataChegada,
            kmChegada
        });

        // Limpar os cookies após salvar no banco de dados
        res.clearCookie('veiculo_ID', { path: '/' });
        res.clearCookie('itinerario', { path: '/' });
        res.clearCookie('servico', { path: '/' });
        res.clearCookie('kmSaida', { path: '/' });
        res.clearCookie('dataSaida', { path: '/' });
        res.clearCookie('usuario_ID', { path: '/' });

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