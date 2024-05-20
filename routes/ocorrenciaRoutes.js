const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

// Rota para adicionar um novo usuário
router.post('/adicionar-ocorrencia', ocorrenciaController);

module.exports = router;