const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');

// Rota para adicionar uma nova viagem
router.post('/', viagemController.adicionarViagem);

// Rota para listar todas as viagens
router.get('/', viagemController.listarViagem);

//Rota para buscar uma viagem especifica por ID (PK)
router.get('/:id', viagemController.buscarViagemPorID);

// Rota PATCH para editar viagem
router.patch('/:id', viagemController.editarViagem);

module.exports = router;