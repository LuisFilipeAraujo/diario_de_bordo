const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para adicionar um novo usuário
router.post('/adicionar-usuarios', usuarioController.adicionarUsuario);

// Rota para listar todos os usuários
router.get('/listar-usuarios', usuarioController.listarUsuario);

//Rota para buscar usuário por ID (PK)
router.get('/get-usuarios/:id', usuarioController.buscarUsuarioPorID);

module.exports = router;
