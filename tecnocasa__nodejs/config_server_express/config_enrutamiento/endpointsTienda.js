// config_server_express/config_enrutamiento/endpointsTienda.js
const express = require('express');
const objetoRouter = express.Router();
const mongoose = require('mongoose');

console.log('✅ endpointsTienda.js cargándose...');

// GET /api/Tienda/CasasDestacadas
objetoRouter.get('/CasasDestacadas', async (req, res) => {
  console.log('═════ OBTENER CASAS DESTACADAS ═════');
  try {
    const casas = await mongoose.connection
      .collection('homes')
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    console.log(`✅ ${casas.length} casas encontradas`);
    if (!casas.length) {
      return res.json({ ok: false, error: 'No hay casas destacadas' });
    }
    return res.json({ ok: true, casas });
  } catch (error) {
    console.error('❌ ERROR COMPLETO:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
});

// GET /api/Tienda/BuscarCasas?q=...
objetoRouter.get('/BuscarCasas', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json({ ok: true, casas: [] });

    // Regex de prefijo (usa índice si existe en location); sensible a mayúsculas desactivado
    const pattern = new RegExp('^' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

    const casas = await mongoose.connection
      .collection('homes')
      .find(
        { location: { $regex: pattern } },
        { projection: { title: 1, location: 1, price: 1, bedrooms: 1, squareMeters: 1, image: 1, description: 1, createdAt: 1 } }
      )
      .sort({ createdAt: -1 })
      .limit(24)
      .toArray();

    return res.json({ ok: true, casas });
  } catch (e) {
    console.error('❌ ERROR BUSCAR:', e);
    res.status(500).json({ ok: false, error: 'Error buscando casas' });
  }
});

module.exports = objetoRouter;
