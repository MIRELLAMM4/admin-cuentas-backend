const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, serviciosController.getServicios);
router.post('/', auth, serviciosController.createServicio);
router.put('/:id', auth, serviciosController.updateServicio);
router.delete('/:id', auth, serviciosController.deleteServicio);

module.exports = router;
