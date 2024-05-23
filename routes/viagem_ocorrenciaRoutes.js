const express = require('express');
const router = express.Router();
const viagem_ocorrenciaController = require('../controllers/viagem_ocorrenciaController');

// Rota para adicionar uma nova viagem_ocorrencia (tabela intermediária de n:n)
router.post('/adicionar', viagem_ocorrenciaController.adicionarViagem_ocorrencia);

//Rota para buscar todas as viagens
router.get('/listar', viagem_ocorrenciaController.listarViagem_ocorrencia);

//Rota para buscar uma viagem especifica por ID (PK)
router.get('/get/:id', viagem_ocorrenciaController.buscarViagem_ocorrenciaPorID);

module.exports = router;