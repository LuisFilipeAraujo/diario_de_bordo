const express = require('express');
const router = express.Router();
const OcorrenciaController = require('../controllers/ocorrenciaController');

// Rota para adicionar um novo usuário
router.post('/ocorrencia', ocorrenciaController);

module.exports = router;