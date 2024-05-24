const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');

// Rota para adicionar uma nova viagem
router.post('/adicionar-viagem', viagemController.adicionarViagem);

// Rota para listar todas as viagens
router.get('/listar-viagem', viagemController.listarViagem);

//Rota para buscar uma viagem especifica por ID (PK)
router.get('/get-viagem/:id', viagemController.buscarViagemPorID);

// Rota PATCH para editar viagem
router.patch('/editar-viagem/:viagem_ID', viagemController.editarViagem);

module.exports = router;