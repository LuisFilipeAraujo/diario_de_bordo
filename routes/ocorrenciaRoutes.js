const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

// Rota para adicionar uma nova ocorrencia
router.post('/adicionar-ocorrencia', ocorrenciaController.adicionarOcorrencia);

module.exports = router;