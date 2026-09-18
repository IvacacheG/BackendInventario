const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// Rutas generales
router.get('/', productoController.obtenerProductos);
router.post('/', productoController.crearProducto);

// Rutas por ID
router.get('/:id', productoController.obtenerProductoPorId);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;