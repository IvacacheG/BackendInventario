const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const protegerRuta = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token del encabezado 'Bearer TOKEN'
      token = req.headers.authorization.split(' ')[1];

      // Verificar la validez del token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjuntar la información del usuario a la petición (excluyendo la contraseña)
      req.usuario = await Usuario.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      return res.status(401).json({ ok: false, mensaje: 'No autorizado, token inválido' });
    }
  }

  if (!token) {
    return res.status(401).json({ ok: false, mensaje: 'No autorizado, no se proporcionó un token' });
  }
};

module.exports = { protegerRuta };