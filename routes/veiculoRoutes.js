const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

// Rota para adicionar um novo veículo
router.post('/', veiculoController.adicionarVeiculo);

// Rota para listar todos os veículos
router.get('/', veiculoController.listarVeiculo);

//Rota para buscar Veiculo por ID (PK)
router.get('/:id', veiculoController.buscarVeiculoPorID);

// Rota PATCH para editar veículo
router.patch('/:id', veiculoController.editarVeiculo);

module.exports = router;
