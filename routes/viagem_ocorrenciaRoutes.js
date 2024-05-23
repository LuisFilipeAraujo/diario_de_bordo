const express = require('express');
const router = express.Router();
const viagem_ocorrenciaController = require('../controllers/viagem_ocorrenciaController');

// Rota para adicionar uma nova viagem_ocorrencia (tabela intermediária de n:n)
router.post('/adicionar', viagem_ocorrenciaController.adicionarViagem_ocorrencia);

router.get('/listar', viagem_ocorrenciaController.listarViagem_ocorrencia);

module.exports = router;