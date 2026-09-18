const manejarErrores = (err, req, res, next) => {
  console.error(`[ERROR LOG]: ${err.stack}`);
  
  const statusCode = err.statusCode || 500;
  const mensaje = err.message || 'Error interno en el servidor';

  res.status(statusCode).json({
    ok: false,
    status: statusCode,
    error: mensaje
  });
};

module.exports = manejarErrores;