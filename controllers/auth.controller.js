const Usuario = require('../models/usuario.model');
const jwt = require('jsonwebtoken');

// Función auxiliar para generar el JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// Registro de Usuario
exports.registrar = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ ok: false, mensaje: 'El email ya está registrado' });
    }

    const usuario = await Usuario.create({ nombre, email, password, rol });
    const token = generarToken(usuario._id);

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario registrado con éxito',
      datos: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// Login de Usuario
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, mensaje: 'Email y contraseña son obligatorios' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    }

    const esCorrecto = await usuario.compararPassword(password);
    if (!esCorrecto) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken(usuario._id);

    res.status(200).json({
      ok: true,
      mensaje: 'Inicio de sesión exitoso',
      datos: {
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      },
      token
    });
  } catch (error) {
    next(error);
  }
};