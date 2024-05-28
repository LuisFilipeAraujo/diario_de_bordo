const express = require('express');
const router = express.Router();
const viagem_ocorrenciaController = require('../controllers/viagem_ocorrenciaController');

// Rota para adicionar uma nova viagem_ocorrencia (tabela intermediária de n:n)
router.post('/', viagem_ocorrenciaController.adicionarViagem_ocorrencia);

//Rota para buscar todas as viagens
router.get('/', viagem_ocorrenciaController.listarViagem_ocorrencia);

//Rota para buscar uma viagem especifica por ID (PK)
router.get('/:id', viagem_ocorrenciaController.buscarViagem_ocorrenciaPorID);

// Rota PATCH para editar viagem_ocorrencia
router.patch('/:id', viagem_ocorrenciaController.editarViagem_ocorrencia);

module.exports = router;