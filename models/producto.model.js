const mongoose = require('mongoose');

// Definimos la estructura del Producto en la Base de Datos
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true
  },
  codigoBarras: {
    type: String,
    unique: true,
    sparse: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  stockMinimo: {
    type: Number,
    default: 5
  }
}, {
  timestamps: true // Guarda automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('Producto', productoSchema);