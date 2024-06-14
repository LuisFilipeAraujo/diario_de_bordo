const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');
//const { viagemController } = require('../controllers/indexController');


// Rota para adicionar uma nova viagem
//router.post('/', viagemController.adicionarViagem);

// Rota para adicionar os detalhes da saída (salvar em cookies)
router.post('/adicionar-saida', viagemController.adicionarSaida);

// Rota para adicionar detalhes da chegada
router.post('/adicionar-chegada', viagemController.adicionarChegada);

// Rota para listar todas as viagens
router.get('/', viagemController.listarViagem);

//Rota para buscar uma viagem especifica por ID (PK)
router.get('/:id', viagemController.buscarViagemPorID);

// Rota PATCH para editar viagem
router.patch('/:id', viagemController.editarViagem);

module.exports = router;