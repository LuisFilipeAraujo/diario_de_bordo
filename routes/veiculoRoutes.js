const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

// Rota para adicionar um novo veículo
router.post('/adicionar-veiculos', veiculoController.adicionarVeiculo);

// Rota para listar todos os veículos
router.get('/listar-veiculos', veiculoController.listarVeiculo);

module.exports = router;
