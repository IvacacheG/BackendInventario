const mongoose = require('mongoose');
const dns = require('dns');

// Forzar el uso de DNS de Google para resolver el SRV de Atlas
dns.setServers(['8.8.8.8', '8.8.4.4']);

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[MONGO DB] Conectado exitosamente: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MONGO DB ERROR]: ${error.message}`);
    process.exit(1);
  }
};

module.exports = conectarDB;