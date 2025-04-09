const express = require('express');
const router = express.Router();
const correosController = require('../controllers/correosController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, correosController.getCorreos);
router.get('/servicio/:id_servicio', auth, correosController.getCorreosPorServicio);
router.post('/', auth, correosController.createCorreo);
router.delete('/:id', auth, correosController.deleteCorreo);

module.exports = router;
