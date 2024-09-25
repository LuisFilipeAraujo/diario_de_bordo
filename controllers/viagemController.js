const Viagem = require('../models/viagem');
const Ocorrencia = require('../models/ocorrencia');
const Usuario = require('../models/usuarios');
const Veiculo = require('../models/veiculo');
const Viagem_ocorrencia = require('../models/viagem_ocorrencia');
const moment = require('moment-timezone'); //configurando time-zone
const sequelize = require('../config/database')

exports.getUniqueValues = async () => {
    try {
        const itinerarios = await Viagem.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('itinerario')), 'itinerario']],
            order: [[sequelize.col('itinerario'), 'ASC']],
            raw: true
        });

        const servicos = await Viagem.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('servico')), 'servico']],
            order: [[sequelize.col('servico'), 'ASC']],
            raw: true
        });
        const modelos = await Veiculo.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('modelo')), 'modelo']],
            order: [[sequelize.col('modelo'), 'ASC']],
            raw: true
        });
        const placas = await Veiculo.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('placa')), 'placa']],
            order: [[sequelize.col('placa'), 'ASC']],
            raw: true
        });
        const nomes = await Usuario.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('nome')), 'nome']],
            order: [[sequelize.col('nome'), 'ASC']],
            raw: true
        });
        const assuntos = await Ocorrencia.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('assunto')), 'assunto']],
            order: [[sequelize.col('assunto'), 'ASC']],
            raw: true
        });
        const envolvidos = await Ocorrencia.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('envolvidos')), 'envolvidos']],
            order: [[sequelize.col('envolvidos'), 'ASC']],
            raw: true
        });
        
        

        return {
            itinerarios: itinerarios.map(itinerario => itinerario.itinerario),
            servicos: servicos.map(servico => servico.servico),
            modelos: modelos.map(modelo => modelo.modelo),
            placas: placas.map(placa => placa.placa),
            nomes: nomes.map(nome => nome.nome),
            assuntos: assuntos.map(assunto => assunto.assunto),
            envolvidos: envolvidos.map(envolvido => envolvido.envolvidos)
        };
    } catch (error) {
        console.error('Erro ao buscar valores únicos :', error);
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
        const { kmChegada, dataChegada,ocorrencia } = req.body;

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

// Se houver ocorrência, salve-a
if (ocorrencia && ocorrencia.assunto && ocorrencia.envolvidos) {
    const novaOcorrencia = await Ocorrencia.create({
        assunto: ocorrencia.assunto,
        envolvidos: ocorrencia.envolvidos,
        dataOcorrencia: dataChegadaFormatada,
        usuario_ID
    });

    // Criar associação na tabela viagem_ocorrencia
    await Viagem_ocorrencia.create({
        viagem_ID: novaViagem.viagem_ID,
        ocorrencia_ID: novaOcorrencia.ocorrencia_ID
    });
}   
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
        const usuario = req.session.user;
        if (!usuario) {
            return res.redirect('/login');
        }

        // Filtros do query string
        const { usuario: filtroUsuario, veiculo, data_inicio, data_fim, ocorrencia, itinerario, servico } = req.query;

        let whereClause = "WHERE 1=1";
        let filtrosExibidos = [];

        // Se o usuário for um motorista, filtrar apenas suas viagens
        if (usuario.tipo_Usuario === 'motorista') {
            whereClause += ` AND v.usuario_ID = ${usuario.usuario_ID}`;
        }

        if (filtroUsuario) {
            whereClause += ` AND u.nome LIKE '%${filtroUsuario}%'`;
            filtrosExibidos.push(`Usuário: ${filtroUsuario}`);
        }

        if (veiculo) {
            whereClause += ` AND (ve.modelo LIKE '%${veiculo}%' OR ve.placa LIKE '%${veiculo}%')`;
            filtrosExibidos.push(`Veículo: ${veiculo}`);
        }

        if (data_inicio) {
            whereClause += ` AND v.dataSaida >= '${data_inicio}'`;
            filtrosExibidos.push(`Data Início: ${moment(data_inicio).format('DD/MM/YYYY')}`);
        }

        if (data_fim) {
            whereClause += ` AND v.dataChegada <= '${data_fim}'`;
            filtrosExibidos.push(`Data Fim: ${moment(data_fim).format('DD/MM/YYYY')}`);
        }

        if (ocorrencia) {
            whereClause += ` AND (o.assunto LIKE '%${ocorrencia}%' OR o.envolvidos LIKE '%${ocorrencia}%')`;
            filtrosExibidos.push(`Ocorrência: ${ocorrencia}`);
        }

        if (itinerario) {
            whereClause += ` AND v.itinerario = '${itinerario}'`;
            filtrosExibidos.push(`Itinerário: ${itinerario}`);
        }

        if (servico) {
            whereClause += ` AND v.servico = '${servico}'`;
            filtrosExibidos.push(`Serviço: ${servico}`);
        }
        // Se não houver filtros, exibir "tudo"
        if (filtrosExibidos.length === 0) {
            filtrosExibidos.push('tudo');
        }

        const query = `
            SELECT 
                v.viagem_ID, v.usuario_ID, v.veiculo_ID, u.nome as nome, 
                ve.modelo as modelo, ve.placa as placa, 
                v.dataSaida, v.dataChegada, v.kmSaida, v.kmChegada, v.itinerario, v.servico,
                o.ocorrencia_ID, o.assunto, o.envolvidos, v.updatedAt, v.createdAt 
            FROM 
                viagem v
            JOIN 
                usuarios u ON v.usuario_ID = u.usuario_ID
            JOIN 
                veiculo ve ON v.veiculo_ID = ve.veiculo_ID
            LEFT JOIN 
                viagem_ocorrencia vo ON v.viagem_ID = vo.viagem_ID
            LEFT JOIN 
                ocorrencia o ON vo.ocorrencia_ID = o.ocorrencia_ID
            ${whereClause}
            ORDER BY 
                v.dataSaida DESC
        `;

        const viagens = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        // Alteração para formatação das datas usando moment
        const viagensMapeadas = viagens.map(viagem => {
            return {
                ...viagem,
                dataSaida: moment(viagem.dataSaida).format('DD/MM/YYYY HH:mm'),  // Formatação de data e hora com localidade pt-br
                dataChegada: moment(viagem.dataChegada).format('DD/MM/YYYY HH:mm'),  // Formatação de data e hora com localidade pt-br
                createdAt: moment(viagem.createdAt).format('DD/MM/YYYY HH:mm'),
                updatedAt: moment(viagem.updatedAt).format('DD/MM/YYYY HH:mm')
            };
        });

        const { itinerarios, servicos, modelos, placas, nomes, assuntos, envolvidos } = await this.getUniqueValues();

        // Obter data atual formatada
        const dataAtual = moment().format('DD/MM/YYYY HH:mm');

        res.render('viagens/historico', { 
            viagens: viagensMapeadas, 
            itinerarios, 
            servicos, 
            modelos, 
            placas, 
            nomes, 
            assuntos, 
            envolvidos,
            dataAtual, 
            filtrosExibidos: filtrosExibidos.join(', ') 
        });
    } catch (error) {
        console.error('Erro ao exibir viagens:', error);
        res.status(500).send('Erro ao exibir viagens');
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

exports.historicoIndex = async (req,res) =>{
    try {
        const usuario = req.session.user;
        if (!usuario) {
            return res.redirect('/login');
        }
    return res.render('viagens/historicoIndex', { user: usuario });
} catch (error) {
    console.error('Erro ao exibir viagens:', error);
    res.status(500).send('Erro ao exibir viagens');
}
};