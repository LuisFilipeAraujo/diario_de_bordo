const express = require('express');
const router = express.Router();
const setorController = require('../controllers/setorController');

// Rota para adicionar um novo usuário
router.post('/adicionar-setor', setorController.adicionarSetor);

module.exports = router;