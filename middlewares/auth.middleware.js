const jwt = require('jsonwebtoken');

// 1. Verificar si el usuario está autenticado mediante el token JWT
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato esperado: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ 
      mensaje: 'Acceso denegado: No se proporcionó un token de autenticación' 
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'clave_secreta_temporal';
    const decoded = jwt.verify(token, secret);
    req.usuario = decoded; // Inyecta los datos del usuario decodificados en la petición
    next();
  } catch (error) {
    return res.status(403).json({ 
      mensaje: 'Token inválido o expirado' 
    });
  }
};

// 2. Verificar si el usuario posee un rol específico permitido
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ 
        mensaje: 'Acceso denegado: No tienes el rol necesario para realizar esta acción' 
      });
    }
    next();
  };
};

// 3. Verificar si el usuario posee un permiso granular específico
const verificarPermiso = (permisoRequerido) => {
  return (req, res, next) => {
    // Si el usuario es ADMIN supremo, tiene acceso total automático
    if (req.usuario && req.usuario.rol === 'ADMIN') {
      return next();
    }

    // Validar si el usuario tiene activado el permiso puntual en su objeto permisos
    if (req.usuario && req.usuario.permisos && req.usuario.permisos[permisoRequerido]) {
      return next();
    }

    return res.status(403).json({ 
      mensaje: `Acceso denegado: No cuentas con el permiso granular '${permisoRequerido}'` 
    });
  };
};

module.exports = {
  verificarToken,
  verificarRol,
  verificarPermiso
};