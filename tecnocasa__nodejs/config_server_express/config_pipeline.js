//config_pipeline.js

const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

module.exports = (serverExpress) => {
  // 1. CORS - UNA SOLA VEZ, AL PRINCIPIO
  serverExpress.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

  // 2. Procesamiento de cookies
  serverExpress.use(cookieParser());

  // 3. Procesamiento de JSON en body
  serverExpress.use(express.json());

  // 4. Procesamiento de URL encoded
  serverExpress.use(express.urlencoded({ extended: false }));

  // 5. Registrar rutas
  serverExpress.use('/api/Cliente', require('./config_enrutamiento/endpointsCliente'));
  serverExpress.use('/api/Tienda', require('./config_enrutamiento/endpointsTienda'));
};
