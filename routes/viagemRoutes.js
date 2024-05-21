const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');

// Rota para adicionar uma nova viagem
router.post('/adicionar-viagem', viagemController.adicionarViagem);

module.exports = router;