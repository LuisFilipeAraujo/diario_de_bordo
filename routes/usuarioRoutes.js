const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para adicionar um novo usuário
router.post('/adicionar-usuarios', usuarioController.adicionarUsuario);

module.exports = router;
