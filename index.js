require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const productoRoutes = require('./routes/producto.routes');
const authRoutes = require('./routes/auth.routes');
const setupSwagger = require('./config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos
conectarDB();

// Rutas API
app.use('/api/productos', productoRoutes);
app.use('/api/auth', authRoutes);

// Documentación Swagger
setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[SERVER] Escuchando en http://localhost:${PORT}`);
});