const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

// Rota para adicionar um novo veículo
router.post('/veiculo', veiculoController.adicionarVeiculo);

module.exports = router;
