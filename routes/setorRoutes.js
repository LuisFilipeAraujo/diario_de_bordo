const express = require('express');
const router = express.Router();
const setorController = require('../controllers/setorController');

// Rota para adicionar um novo setor
router.post('/', setorController.adicionarSetor);

//Rota para buscar todos os setores
router.get('/', setorController.listarSetor);

//Rota para buscar setor por ID (PK)
router.get('/:id', setorController.buscarSetorPorID);

// Rota PATCH para editar setor
router.patch('/:id', setorController.editarSetor);

module.exports = router;