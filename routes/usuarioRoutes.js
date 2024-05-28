const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para adicionar um novo usuário
router.post('/', usuarioController.adicionarUsuario);

// Rota para listar todos os usuários
router.get('/', usuarioController.listarUsuario);

//Rota para buscar usuário por ID (PK)
router.get('/:id', usuarioController.buscarUsuarioPorID);

// Rota PATCH para editar usuário
router.patch('/:id', usuarioController.editarUsuario);

module.exports = router;
