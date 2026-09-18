const mongoose = require('mongoose');

const movimientoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: [true, 'El producto es obligatorio']
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'El usuario es obligatorio']
  },
  tipo: {
    type: String,
    enum: ['ENTRADA', 'SALIDA'],
    required: [true, 'El tipo de movimiento es obligatorio (ENTRADA o SALIDA)']
  },
  cantidad: {
    type: Number,
    required: [true, 'La cantidad es obligatoria'],
    min: [1, 'La cantidad debe ser al menos 1']
  },
  motivo: {
    type: String,
    trim: true,
    default: 'Venta / Ajuste de inventario'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movimiento', movimientoSchema);