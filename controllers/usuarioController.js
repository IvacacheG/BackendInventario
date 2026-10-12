const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// 1. Listar todos los usuarios del sistema (Solo Admin)
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

// 2. Dar de alta un nuevo usuario y configurar sus permisos personalizados
exports.crearUsuarioAdmin = async (req, res) => {
  try {
    const { nombre, email, password, rol, permisos } = req.body;

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      rol: rol || 'USER',
      permisos: permisos || {
        crearProductos: false,
        modificarStock: false,
        registrarVentas: true,
        verReportes: true,
        gestionarUsuarios: false
      }
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente por el administrador',
      usuario: {
        _id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
        permisos: nuevoUsuario.permisos
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
  }
};

// 3. Modificar el rol o los permisos específicos de un usuario existente
exports.actualizarPermisos = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol, permisos } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { 
        ...(rol && { rol }), 
        ...(permisos && { permisos }) 
      },
      { new: true }
    ).select('-password');

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Permisos actualizados correctamente',
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar permisos', error: error.message });
  }
};