//server.js
require('dotenv').config();
const configExpress = require('express');
const mongoose = require('mongoose');
const configPipeline = require('./config_server_express/config_pipeline');

const serverExpress = configExpress();

//Conecta mongoose y luego levanta el servidor Express
(async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB, {
      maxPoolSize: 20, serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Mongoose conectado (global)');

    configPipeline(serverExpress);

    const PORT = process.env.PORT || 3000;
    serverExpress.listen(PORT, (error) => {
      if (error) console.log(`error al levantar el servidor express TECNOCASA: ${error}`);
      else console.log(`....servidor express TECNOCASA levantado y escuchando en el puerto ${PORT}...`);
    });
  } catch (e) {
    console.error('❌ No se pudo conectar a MongoDB:', e);
    process.exit(1);
  }
})();

// Cierre ordenado
process.on('SIGINT', async () => { await mongoose.disconnect(); process.exit(0); });
process.on('SIGTERM', async () => { await mongoose.disconnect(); process.exit(0); });
