const Veiculo = require('../models/veiculo');
const Setor = require('../models/setor');

//POST
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

//GET ALL
exports.listarVeiculo = async (req, res) => {
  try {
      const veiculos = await Veiculo.findAll();
      res.status(200).json(veiculos);
  } catch (error) {
      console.error('Erro ao listar veículos:', error);
      res.status(500).json({ message: 'Erro ao listar veículos' });
  }
};

//GET por ID
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

// PATCH
exports.editarVeiculo = async (req, res) => {
  try {
      const { veiculo_ID } = req.params;
      const atualizacoes = req.body;

      const veiculo = await Veiculo.findByPk(veiculo_ID);

      if (!veiculo) {
          return res.status(404).json({ message: 'Veículo não encontrado' });
      }

      await veiculo.update(atualizacoes);
      
      res.status(200).json({ message: 'Veículo atualizado com sucesso', veiculo });
  } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      res.status(500).json({ message: 'Erro ao atualizar veículo' });
  }
};

exports.renderizarCriarVeiculo = async (req, res) => {
  try {
      const setores = await Setor.findAll();
      res.render('veiculos/criar-veiculos', { setores });
  } catch (error) {
      console.error('Erro ao buscar setores:', error);
      res.status(500).send('Erro ao carregar a página');
  }
};