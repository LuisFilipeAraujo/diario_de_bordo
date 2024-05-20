const express = require('express');
const router = express.Router();
const viagemController = require('../controllers/viagemController');

// Rota para adicionar um novo usuário
router.post('/adicionar-viagem', viagemController);

module.exports = router;