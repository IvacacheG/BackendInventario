const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { protegerRuta } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/stock-bajo', productoController.obtenerStockBajo);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);

// Rutas protegidas (requieren Token JWT)
router.post('/', protegerRuta, productoController.crearProducto);
router.put('/:id', protegerRuta, productoController.actualizarProducto);
router.delete('/:id', protegerRuta, productoController.eliminarProducto);

module.exports = router;