const Producto = require('../models/producto.model');

// Obtener todos los productos
exports.obtenerProductos = async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({ ok: true, datos: productos });
  } catch (error) {
    next(error);
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res, next) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ ok: true, datos: producto });
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto
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

// Actualizar un producto por ID
exports.actualizarProducto = async (req, res, next) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!productoActualizado) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ ok: true, mensaje: 'Producto actualizado', datos: productoActualizado });
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto por ID
exports.eliminarProducto = async (req, res, next) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ ok: true, mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};