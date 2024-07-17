const Viagem = require('../models/viagem');
const moment = require('moment-timezone'); //configurando time-zone
const { Sequelize } = require('sequelize');

exports.getUniqueValues = async () => {
    try {
        const itinerarios = await Viagem.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('itinerario')), 'itinerario']],
            order: [[Sequelize.col('itinerario'), 'ASC']],
            raw: true
        });

        const servicos = await Viagem.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('servico')), 'servico']],
            order: [[Sequelize.col('servico'), 'ASC']],
            raw: true
        });

        return {
            itinerarios: itinerarios.map(itinerario => itinerario.itinerario),
            servicos: servicos.map(servico => servico.servico)
        };
    } catch (error) {
        console.error('Erro ao buscar valores únicos de itinerários e serviços:', error);
        throw error;
    }
};

exports.exibirChegada = (req, res) => {
    try {
        const usuario = req.session.user;
        if (!usuario) {
            return res.redirect('/login');
        }
        
        res.render('viagens/adicionar-chegada', { user: usuario });
    } catch (error) {
        console.error('Erro ao exibir chegada:', error);
        res.status(500).send('Erro ao exibir chegada');
    }
};

//POST
exports.adicionarSaida = async (req, res) => {
  try {
    const { veiculo_ID, usuario_ID, itinerario, servico, dataSaida, kmSaida } = req.body;
    
    // Verificar campos obrigatórios
    if (!veiculo_ID || !usuario_ID || !itinerario || !servico || !dataSaida || !kmSaida) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }
   
    // Converter dataSaida para o fuso horário de São Paulo
    const dataSaidaFormatada = moment(dataSaida).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
   
   // Salvar dados em cookies
   res.cookie('veiculo_ID', veiculo_ID, { path: '/' });
   res.cookie('itinerario', itinerario, { path: '/' });
   res.cookie('servico', servico, { path: '/' });
   res.cookie('kmSaida', kmSaida, { path: '/' });
   res.cookie('dataSaida', dataSaidaFormatada, { path: '/' });
   res.cookie('usuario_ID', usuario_ID, { path: '/' });

   // Retornar uma resposta de sucesso
   res.json({ success: true });
} catch (error) {
    console.error('Erro ao adicionar saída:', error);
    res.json({ success: false });
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
        if (!kmChegada || !dataChegada) {
            return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
        }

        // Converter dataChegada para o fuso horário de São Paulo
        const dataChegadaFormatada = moment(dataChegada).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
        const dataSaidaFormatada = moment(dataSaida).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'); // Converter dataSaida também
        const now = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
        
        // Criar nova viagem com os dados combinados
        const novaViagem = await Viagem.create({
            veiculo_ID,
            usuario_ID,
            itinerario,
            servico,
            dataSaida: dataSaidaFormatada,
            kmSaida,
            dataChegada: dataChegadaFormatada,
            kmChegada,
            createdAt: now,
            updatedAt: now
        });

        // Limpar os cookies após salvar no banco de dados
        res.clearCookie('veiculo_ID', { path: '/' });
        res.clearCookie('itinerario', { path: '/' });
        res.clearCookie('servico', { path: '/' });
        res.clearCookie('kmSaida', { path: '/' });
        res.clearCookie('dataSaida', { path: '/' });
        res.clearCookie('usuario_ID', { path: '/' });

       
   // Retornar uma resposta de sucesso
   res.json({ success: true });
} catch (error) {
    console.error('Erro ao adicionar saída:', error);
    res.json({ success: false });
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