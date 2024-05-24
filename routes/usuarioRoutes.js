const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para adicionar um novo usuário
router.post('/adicionar-usuarios', usuarioController.adicionarUsuario);

// Rota para listar todos os usuários
router.get('/listar-usuarios', usuarioController.listarUsuario);

//Rota para buscar usuário por ID (PK)
router.get('/get-usuarios/:id', usuarioController.buscarUsuarioPorID);

// Rota PATCH para editar usuário
router.patch('/editar-usuarios/:usuario_ID', usuarioController.editarUsuario);

module.exports = router;
