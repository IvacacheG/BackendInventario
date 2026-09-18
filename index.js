const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Importamos la función de conexión a MongoDB
const conectarDB = require('./config/db');

const manejarErrores = require('./middlewares/error.middleware');
const setupSwagger = require('./config/swagger');
const productoRoutes = require('./routes/producto.routes');

const app = express();

// 2. Ejecutamos la conexión a la base de datos
conectarDB();

// Middlewares iniciales
app.use(cors());
app.use(express.json());

// Documentación Swagger
setupSwagger(app);

// Rutas de la API
app.use('/api/productos', productoRoutes);

// Ruta Base de Verificación (Healthcheck)
app.get('/api/health', (req, res) => {
  res.json({
    estado: 'OK',
    mensaje: 'Servidor Backend de Desarrollo funcionando correctamente',
    timestamp: new Date()
  });
});

// Middleware Global de Errores (SIEMPRE al final)
app.use(manejarErrores);

// Configuración de Puerto y Encendido
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] Escuchando en http://localhost:${PORT}`);
});