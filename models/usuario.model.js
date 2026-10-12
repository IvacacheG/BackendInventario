const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  rol: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  // Permisos granulares solicitados por el profesor
  permisos: {
    crearProductos: { type: Boolean, default: false },
    modificarStock: { type: Boolean, default: false },
    registrarVentas: { type: Boolean, default: true },
    verReportes: { type: Boolean, default: true },
    gestionarUsuarios: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);