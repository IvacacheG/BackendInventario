const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');
const { protegerRuta } = require('../middlewares/auth.middleware');

// Rutas protegidas (requieren Token JWT)
router.post('/', protegerRuta, movimientoController.registrarMovimiento);
router.get('/', protegerRuta, movimientoController.obtenerMovimientos);

module.exports = router;