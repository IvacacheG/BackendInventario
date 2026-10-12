const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { verificarToken, verificarPermiso } = require('../middlewares/auth.middleware'); // <--- RUTA CORREGIDA

// Rutas públicas (cualquiera puede ver el catálogo y el stock bajo)
router.get('/stock-bajo', productoController.obtenerStockBajo);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);

// Rutas protegidas con permisos granulares
router.post('/', [verificarToken, verificarPermiso('crearProductos')], productoController.crearProducto);
router.put('/:id', [verificarToken, verificarPermiso('modificarStock')], productoController.actualizarProducto);
router.delete('/:id', [verificarToken, verificarPermiso('crearProductos')], productoController.eliminarProducto);

module.exports = router;