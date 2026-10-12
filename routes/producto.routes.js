const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const { verificarToken, verificarPermiso } = require('../middlewares/auth');

// Rutas públicas (cualquiera puede ver el catálogo y el stock bajo)
router.get('/stock-bajo', productoController.obtenerStockBajo);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProductoPorId);

// Rutas protegidas con permisos granulares (profesor requirements)
// 1. Crear producto: Requiere token y permiso 'crearProductos'
router.post('/', [verificarToken, verificarPermiso('crearProductos')], productoController.crearProducto);

// 2. Actualizar producto/stock: Requiere token y permiso 'modificarStock'
router.put('/:id', [verificarToken, verificarPermiso('modificarStock')], productoController.actualizarProducto);

// 3. Eliminar producto: Requiere token y permiso de creación/admin
router.delete('/:id', [verificarToken, verificarPermiso('crearProductos')], productoController.eliminarProducto);

module.exports = router;