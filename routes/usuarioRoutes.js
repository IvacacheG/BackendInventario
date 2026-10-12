const express = require('express');
const router = express.Router();
const { 
  obtenerUsuarios, 
  crearUsuarioAdmin, 
  actualizarPermisos 
} = require('../controllers/usuarioController');
const { verificarToken, verificarRol } = require('../middlewares/auth');

// Todas estas rutas están protegidas y exigen que quien las invoque sea rol 'ADMIN'
router.get('/', [verificarToken, verificarRol('ADMIN')], obtenerUsuarios);
router.post('/', [verificarToken, verificarRol('ADMIN')], crearUsuarioAdmin);
router.put('/:id/permisos', [verificarToken, verificarRol('ADMIN')], actualizarPermisos);

module.exports = router;