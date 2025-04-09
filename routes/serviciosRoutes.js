const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, serviciosController.getServicios);
router.post('/', authMiddleware, serviciosController.createServicio);
router.put('/:id', authMiddleware, serviciosController.updateServicio);
router.delete('/:id', authMiddleware, serviciosController.deleteServicio);

module.exports = router;
