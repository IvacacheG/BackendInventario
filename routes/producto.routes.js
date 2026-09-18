const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene la lista de todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 */
router.get('/', productoController.obtenerProductos);

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *       400:
 *         description: Datos incompletos
 */
router.post('/', productoController.crearProducto);

module.exports = router;