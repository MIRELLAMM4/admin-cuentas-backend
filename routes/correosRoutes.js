const express = require('express');
const router = express.Router();
const correosController = require('../controllers/correosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, correosController.getCorreos);
router.get('/servicio/:id_servicio', authMiddleware, correosController.getCorreosByServicio);
router.post('/', authMiddleware, correosController.createCorreo);
router.delete('/:id', authMiddleware, correosController.deleteCorreo);

module.exports = router;
