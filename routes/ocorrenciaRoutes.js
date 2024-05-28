const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

// Rota para adicionar uma nova ocorrencia
router.post('/', ocorrenciaController.adicionarOcorrencia);

//Rota para buscar todas as Ocorrências
router.get('/', ocorrenciaController.listarOcorrencia);

//Rota para buscar Ocorrência por ID (PK)
router.get('/:id', ocorrenciaController.buscarOcorrenciaPorID);

// Rota PATCH para editar ocorrência
router.patch('/:id', ocorrenciaController.editarOcorrencia);

module.exports = router;