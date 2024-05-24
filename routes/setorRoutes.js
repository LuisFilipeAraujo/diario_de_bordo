const express = require('express');
const router = express.Router();
const setorController = require('../controllers/setorController');

// Rota para adicionar um novo setor
router.post('/adicionar-setor', setorController.adicionarSetor);

//Rota para buscar todos os setores
router.get('/listar-setor', setorController.listarSetor);

//Rota para buscar setor por ID (PK)
router.get('/get-setor/:id', setorController.buscarSetorPorID);

// Rota PATCH para editar setor
router.patch('/editar-setor/:setor_ID', setorController.editarSetor);

module.exports = router;