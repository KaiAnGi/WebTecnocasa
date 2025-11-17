const express = require('express');
const objetoRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../../middlewares/authJwt'); // ajusta ruta
const { verifyRecaptchaV2 } = require('../../servicios/verifyCaptchaService');
const { enviarEmailConfirmacion } = require('../../servicios/emailService');

const colClientes = () => mongoose.connection.collection('clientes');

// POST /api/Cliente/RegistroOLogin
objetoRouter.post('/Cliente/RegistroOLogin', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ ok: false, error: 'Email y contraseña requeridos' });

    const clientes = colClientes();
    const user = await clientes.findOne({ 'cuenta.email': email });

    if (user) {
      const okPwd = user?.cuenta?.password ? bcrypt.compareSync(password, user.cuenta.password) : false;
      if (!okPwd) return res.status(401).json({ ok: false, error: 'Contraseña incorrecta' });

      const token = jwt.sign({ userId: user._id.toString(), email: user.cuenta.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '24h' });
      return res.status(200).json({ ok: true, action: 'login', user: { email: user.cuenta.email, id: user._id }, token });
    }

    const hashed = bcrypt.hashSync(password, 10);
    const now = new Date();
    const tokenConfirmacion = jwt.sign({ email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '24h' });
    const doc = {
      cuenta: {
        email,
        password: hashed,
        cuentaActivada: false,
        tokenConfirmacion,
        fechaTokenConfirmacion: now,
        imagenAvatar: '',
        fechaCreacionCuenta: now.getTime(),
        telefonoContacto: '',
        preferenciasNotificaciones: true
      },
      datosPersonales: { nombre: '', apellidos: '', genero: '', fechaNacimiento: null },
      direcciones: [], inmueblesFavoritos: [], busquedasGuardadas: [], metodosPago: [], historialVisitas: []
    };
    const ins = await clientes.insertOne(doc);

    enviarEmailConfirmacion(email, tokenConfirmacion).catch(err => console.error('Email error:', err));

    const token = jwt.sign({ userId: ins.insertedId.toString(), email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '24h' });
    return res.status(201).json({
      ok: true, action: 'register', user: { email, id: ins.insertedId }, token,
      message: 'Registro exitoso. Revisa tu email para confirmar tu cuenta.'
    });
  } catch (e) {
    console.error('RegistroOLogin error:', e);
    return res.status(500).json({ ok: false, error: e.message || 'Error interno' });
  }
});

// POST /api/Cliente/ConfirmarEmail (igual que tenías, usando tokenConfirmacion)
objetoRouter.post('/Cliente/ConfirmarEmail', async (req, res) => {
  try {
    const { token } = req.body || {};
    if (!token) return res.status(400).json({ ok: false, error: 'Token requerido' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    const email = decoded.email;

    const resp = await colClientes().updateOne(
      { 'cuenta.email': email },
      { $set: { 'cuenta.cuentaActivada': true, 'cuenta.tokenConfirmacion': null, 'cuenta.fechaTokenConfirmacion': null } }
    );
    if (resp.modifiedCount === 0) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    return res.json({ ok: true, message: 'Email confirmado exitosamente. Ya puedes iniciar sesión.' });
  } catch (e) {
    const msg = e.name === 'TokenExpiredError' ? 'Token expirado. Solicita uno nuevo.' : e.message;
    return res.status(400).json({ ok: false, error: msg });
  }
});

// POST /api/Cliente/ActualizarPassword (protegido)
objetoRouter.post('/Cliente/ActualizarPassword', requireAuth, async (req, res) => {
  try {
    const { email, passwordAntiguo, passwordNuevo, captchaToken } = req.body || {};
    if (!email || !passwordAntiguo || !passwordNuevo) return res.status(400).json({ ok: false, error: 'Campos requeridos' });

    const captchaOk = await verifyRecaptchaV2(captchaToken, req.ip);
    if (!captchaOk) return res.status(400).json({ ok: false, error: 'CAPTCHA inválido' });

    const userId = req.auth.userId;
    const clientes = colClientes();
    const user = await clientes.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    if (!user || user.cuenta.email !== email) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });

    const match = bcrypt.compareSync(passwordAntiguo, user.cuenta.password);
    if (!match) return res.status(400).json({ ok: false, error: 'Contraseña actual incorrecta' });

    const hashed = bcrypt.hashSync(passwordNuevo, 10);
    const upd = await clientes.updateOne({ _id: user._id }, { $set: { 'cuenta.password': hashed } });
    if (upd.modifiedCount === 0) return res.status(500).json({ ok: false, error: 'No se pudo actualizar la contraseña' });
    return res.json({ ok: true, message: 'Contraseña actualizada correctamente' });
  } catch (e) {
    console.error('ActualizarPassword error:', e);
    return res.status(500).json({ ok: false, error: 'Error interno' });
  }
});

// DELETE /api/usuarios/me (protegido + reCAPTCHA)
objetoRouter.delete('/usuarios/me', requireAuth, async (req, res) => {
  try {
    const { recaptchaToken } = req.body || {};
    const ok = await verifyRecaptchaV2(recaptchaToken, req.ip);
    if (!ok) return res.status(400).json({ message: 'CAPTCHA inválido' });

    const _id = new mongoose.Types.ObjectId(req.auth.userId);
    const result = await colClientes().deleteOne({ _id });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    return res.status(204).end();
  } catch (e) {
    console.error('Error al borrar cuenta:', e);
    return res.status(500).json({ message: 'Error interno al borrar la cuenta' });
  }
});

module.exports = objetoRouter;
