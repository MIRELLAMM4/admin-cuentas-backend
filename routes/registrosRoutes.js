const express = require('express');
const router = express.Router();
const registrosController = require('../controllers/registrosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, registrosController.getRegistros);
router.post('/', authMiddleware, registrosController.createRegistro);
router.delete('/:id', authMiddleware, registrosController.deleteRegistro);
router.put('/renovar/:id', authMiddleware, registrosController.renovarRegistro);

module.exports = router;
