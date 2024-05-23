const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

// Rota para adicionar uma nova ocorrencia
router.post('/adicionar-ocorrencia', ocorrenciaController.adicionarOcorrencia);

router.get('/listar-ocorrencias', ocorrenciaController.listarOcorrencia);

//Rota para buscar Ocorrência por ID (PK)
router.get('/get-ocorrencia/:id', ocorrenciaController.buscarOcorrenciaPorID);

module.exports = router;