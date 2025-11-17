// servicios/nuevoClienteService.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function colClientes() { return mongoose.connection.collection('clientes'); }

async function registrarNuevoCliente({ email, password }) {
  const clientes = colClientes();
  const ya = await clientes.findOne({ 'cuenta.email': email });
  if (ya) return { exists: true, user: ya };

  const now = new Date();
  const hashedPassword = bcrypt.hashSync(password, 10);
  const tokenConfirmacion = jwt.sign({ email }, process.env.JWT_SECRET || 'confirm_secret', { expiresIn: '24h' });

  const doc = {
    cuenta: {
      email,
      password: hashedPassword,
      cuentaActivada: false,
      tokenConfirmacion,
      fechaTokenConfirmacion: now,
      imagenAvatar: '',
      fechaCreacionCuenta: now.getTime(),
      telefonoContacto: '',
      preferenciasNotificaciones: true
    },
    datosPersonales: {
      nombre: '',
      apellidos: '',
      genero: '',
      fechaNacimiento: null
    },
    direcciones: [],
    inmueblesFavoritos: [],
    busquedasGuardadas: [],
    metodosPago: [],
    historialVisitas: []
  };

  const ins = await clientes.insertOne(doc);
  return { createdId: ins.insertedId, tokenConfirmacion };
}

module.exports = { registrarNuevoCliente };
