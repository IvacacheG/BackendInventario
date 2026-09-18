const Producto = require('../models/producto.model');

// Obtener todos los productos desde la base de datos
exports.obtenerProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({ ok: true, datos: productos });
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto en la base de datos
exports.crearProducto = async (req, res, next) => {
  try {
    const { nombre, precio, stock, codigoBarras, stockMinimo } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Bad Request: Nombre y precio son obligatorios'
      });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      stock,
      codigoBarras,
      stockMinimo
    });

    res.status(201).json({ 
      ok: true, 
      mensaje: 'Producto creado exitosamente en la base de datos', 
      datos: nuevoProducto 
    });
  } catch (error) {
    next(error);
  }
};